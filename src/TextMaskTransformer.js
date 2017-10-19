import adjustCaretPosition from 'text-mask-core/src/adjustCaretPosition';
import conformToMask from 'text-mask-core/src/conformToMask';
import {convertMaskToPlaceholder, isString, isNumber, processCaretTraps} from 'text-mask-core/src/utilities';
import {placeholderChar as defaultPlaceholderChar} from 'text-mask-core/src/constants';

function getSafeRawValue(inputValue) {
    if (inputValue == null) return '';
    if (isString(inputValue)) return inputValue;
    if (isNumber(inputValue)) return String(inputValue);

    throw new Error(
        "The 'value' provided to Text Mask needs to be a string or a number. The value " +
            `received was:\n\n ${JSON.stringify(inputValue)}`
    );
}

export default class TextMaskTransformer {
    previousConformedValue = undefined;
    previousPlaceholder = undefined;

    update({
        value: rawValue,
        caretPosition: currentCaretPosition,
        mask: providedMask,
        guide,
        pipe,
        placeholderChar = defaultPlaceholderChar,
        keepCharPositions = false,
        showMask = false,
    }) {
        // If `rawValue` equals `state.previousConformedValue`, we don't need to change anything. So, we return.
        // This check is here to handle controlled framework components that repeat the `update` call on every render.
        if (rawValue === this.previousConformedValue) {
            return null;
        }

        // Text Mask accepts masks that are a combination of a `mask` and a `pipe` that work together.
        // If such a `mask` is passed, we destructure it below, so the rest of the code can work normally
        // as if a separate `mask` and a `pipe` were passed.
        if (
            providedMask != null &&
            typeof providedMask === 'object' &&
            providedMask.pipe != null &&
            providedMask.mask != null
        ) {
            /* eslint-disable no-param-reassign, prefer-destructuring */
            pipe = providedMask.pipe;
            providedMask = providedMask.mask;
            /* eslint-enable */
        }

        // The `placeholder` is an essential piece of how Text Mask works. For a mask like `(111)`,
        // the placeholder would be `(___)` if the `placeholderChar` is set to `_`.
        let placeholder;

        // We don't know what the mask would be yet. If it is an array, we take it as is, but if it's a function,
        // we will have to call that function to get the mask array.
        let mask;

        // If the provided mask is an array, we can call `convertMaskToPlaceholder` here once and we'll always have the
        // correct `placeholder`.
        if (Array.isArray(providedMask)) {
            placeholder = convertMaskToPlaceholder(providedMask, placeholderChar);
        }

        // We check the provided `rawValue` before moving further.
        // If it's something we can't work with `getSafeRawValue` will throw.
        const safeRawValue = getSafeRawValue(rawValue);

        // In framework components that support reactivity, it's possible to turn off masking by passing
        // `false` for `mask` after initialization. See https://github.com/text-mask/text-mask/pull/359
        if (providedMask === false) {
            return {
                value: safeRawValue,
                caretPosition: currentCaretPosition,
            };
        }

        let caretTrapIndexes;

        // If the `providedMask` is a function. We need to call it at every `update` to get the `mask` array.
        // Then we also need to get the `placeholder`
        if (typeof providedMask === 'function') {
            mask = providedMask(safeRawValue, {
                currentCaretPosition,
                previousConformedValue: this.previousConformedValue,
                placeholderChar,
            });

            // disable masking if `mask` is `false`
            if (mask === false) {
                return null;
            }

            // mask functions can setup caret traps to have some control over how the caret moves. We need to process
            // the mask for any caret traps. `processCaretTraps` will remove the caret traps from the mask and return
            // the indexes of the caret traps.
            const {maskWithoutCaretTraps, indexes} = processCaretTraps(mask);

            // The processed mask is what we're interested in
            mask = maskWithoutCaretTraps;
            // And we need to store these indexes because they're needed by `adjustCaretPosition`
            caretTrapIndexes = indexes;

            placeholder = convertMaskToPlaceholder(mask, placeholderChar);

            // If the `providedMask` is not a function, we just use it as-is.
        }
        else {
            mask = providedMask;
        }

        // The following object will be passed to `conformToMask` to determine how the `rawValue` will be conformed
        const conformToMaskConfig = {
            previousConformedValue: this.previousConformedValue,
            guide,
            placeholderChar,
            pipe,
            placeholder,
            currentCaretPosition,
            keepCharPositions,
        };

        // `conformToMask` returns `conformedValue` as part of an object for future API flexibility
        const {conformedValue} = conformToMask(safeRawValue, mask, conformToMaskConfig);

        // The following few lines are to support the `pipe` feature.
        const piped = typeof pipe === 'function';

        let pipeResults = {};

        // If `pipe` is a function, we call it.
        if (piped) {
            // `pipe` receives the `conformedValue` and the configurations with which `conformToMask` was called.
            pipeResults = pipe(conformedValue, {rawValue: safeRawValue, ...conformToMaskConfig});

            // `pipeResults` should be an object. But as a convenience, we allow the pipe author to just
            // return `false` to indicate rejection. Or return just a string when there are no piped characters.
            // If the `pipe` returns `false` or a string, the block below turns it into an object that the rest
            // of the code can work with.
            if (pipeResults === false) {
                // If the `pipe` rejects `conformedValue`, we use the `previousConformedValue`,
                // and set `rejected` to `true`.
                pipeResults = {value: this.previousConformedValue, rejected: true};
            }
            else if (isString(pipeResults)) {
                pipeResults = {value: pipeResults};
            }
        }

        // Before we proceed, we need to know which conformed value to use, the one returned by the pipe or the one
        // returned by `conformToMask`.
        const finalConformedValue = piped ? pipeResults.value : conformedValue;

        // After determining the conformed value, we will need to know where to set
        // the caret position. `adjustCaretPosition` will tell us.
        const adjustedCaretPosition = adjustCaretPosition({
            previousConformedValue: this.previousConformedValue,
            previousPlaceholder: this.previousPlaceholder,
            conformedValue: finalConformedValue,
            placeholder,
            rawValue: safeRawValue,
            currentCaretPosition,
            placeholderChar,
            indexesOfPipedChars: pipeResults.indexesOfPipedChars,
            caretTrapIndexes,
        });

        // Text Mask sets the input value to an empty string when the condition below is set. It provides a better UX.
        const inputValueShouldBeEmpty = finalConformedValue === placeholder && adjustedCaretPosition === 0;
        const emptyValue = showMask ? placeholder : '';
        const inputElementValue = inputValueShouldBeEmpty ? emptyValue : finalConformedValue;

        this.previousConformedValue = inputElementValue; // store value for access for next time
        this.previousPlaceholder = placeholder;

        return {
            value: inputElementValue,
            caretPosition: adjustedCaretPosition,
        };
    }
}
