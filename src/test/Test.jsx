import { Component } from 'react';

const INITIAL_STATE = {
  login: [],
};

export class Test extends Component {
  state = {
    ...INITIAL_STATE,
  };

  componentDidMount() {
    console.log('Mount');

    const stringLogin = localStorage.getItem('login');
    console.log(stringLogin);

    const parseLogin = JSON.parse(stringLogin);
    console.log(parseLogin);

    if (parseLogin) this.setState({ login: parseLogin });
  }

  componentDidUpdate(prevState) {
    console.log('Update');
    console.log('пред стейт', prevState);
    console.log('измененный стейт', this.state);

    //this.setState() вызивать только по проверки условия
    if (this.state.login !== prevState.login) {
      console.log('обновилось поле логин');

      localStorage.setItem('login', JSON.stringify(this.state.login));
    }
  }

  handleChange = e => {
    this.setState({ login: e.target.value });
  };

  render() {
    console.log('render');

    const { login } = this.state;

    return (
      <div>
        <input type="text" value={login} onChange={this.handleChange} />
        {login}
      </div>
    );
  }
}
