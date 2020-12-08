import { linker, State, store } from './store';

type S = { };
type P = { } & ReturnType<typeof link>;

class _App extends React.Component<P, S> {

    componentDidMount() {
        setTimeout(() => store.setState({ text: 'React Works!' }), 1500);
    }

    render() {
        return <>
            <h1>{this.props.text}</h1>
        </>
    }
}

const link = (s: State) => ({ text: s.text });
export default linker(link, _App);
