import hoistStatics from 'hoist-non-react-statics';
import TextMask from './TextMask';

const getDisplayName = Comp => Comp.displayName || Comp.name || 'Unknown';

export default function withTextMask(AdaptedComponent) {
    class TextMaskWrapper extends TextMask {
        static displayName = `TextMask(${getDisplayName(AdaptedComponent)})`;

        static defaultProps = {
            ...TextMask.defaultProps,
            Component: AdaptedComponent,
        };
    }

    return hoistStatics(TextMaskWrapper, AdaptedComponent);
}
