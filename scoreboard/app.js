const Header = (props) => {
    return (
        <header>
            <h1>{props.title}</h1>
            <span className="stats">Players: {props.totalPlayers}</span>
        </header>
    );
}

const Player = (props) => {
    return (
        <div className="player">
            <span className="player-name">
            <button className="remove-player" onClick={ () => props.removePlayer(props.id)}>✖</button>
            {props.name}
            </span>
            <Counter />
        </div>
    )
}

class Counter extends React.Component {
    constructor() {
        super();
        this.state = {
            score: 0
        }
    };

    // passes in prevState as a callback. this allows state to update to ensure that state updates immediately and correctly

    incrementScore = () => {
        this.setState(prevState => {
            return {
                score: prevState.score + 1
            }
        })
    }

    // using () after cb allows not using the curly braces and return statement.  functions the same as incrementScore
    decrementScore = () => {
        this.setState(prevState => ( {
            score: prevState.score - 1
        }))
}

render() {
    return (
        <div className="counter">
            <button className="counter-action decrement" onClick={this.decrementScore.bind(this)}> - </button>
            <span className="counter-score">{this.state.score}</span>
            <button className="counter-action increment" onClick={this.incrementScore.bind(this)}> + </button>
        </div>
    )
}
}

class App extends React.Component {

    state = {
        players: [
            {
                name: "Josh",
                id: 1
            },
            {
                name: "Jack",
                id: 2
            },
            {
                name: "John",
                id: 3
            },
            {
                name: "James",
                id: 4
            }
        ]
    }
    
    // filters out player objects whos id's arent equal to the passed id
    handleRemovePlayer = (id) => {
        this.setState( prevState => {
            return {
                players: prevState.players.filter(p => p.id !== id)
            }
        })
    }

    render () {
        return (
            <div className="scoreboard">
                <Header title="Scoreboard" totalPlayers={this.state.players.length} />
                {this.state.players.map(player =>
                    <Player name={player.name} key={player.id.toString()} score={player.score} removePlayer={this.handleRemovePlayer} id={player.id} />
                )}
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))