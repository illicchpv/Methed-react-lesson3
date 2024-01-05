import React from 'react';
import PropTypes from 'prop-types';
import style from './ClassComponent.module.css';

const youWinStartMsg = 'вы угадали!';
const gameMsg = 'результат';

/* eslint-disable */
export class ClassComponent extends React.Component {
  state = {
    result: gameMsg,
    userNumber: '',
    randomNumber: Math.floor(Math.random() * (this.props.max - this.props.min)) + this.props.min,

    count: 0,
  };
  /* если просто инициализация, то можно без конструктора так ☝️
  constructor(props) {
    super(props);
    // debugger;
    this.state = {
      result: 'result',
      userNumber: '',
      randomNumber: Math.floor(Math.random() * (this.props.max - this.props.min)) + this.props.min,
    };

    // 1 варианты привязки handleSubmit к this
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  */
  // 1 onSubmit={this.handleSubmit}
  // 2 варианты привязки handleSubmit к this
  // onSubmit={(e) => {this.handleSubmit(e)}}
  // handleSubmit(e){
  //   e.preventDefault()
  //   console.warn(`🚀 ~ e:`, e, this.state.number)
  // };

  handleRepeat = (e) => {
    e.preventDefault();
    this.setState((state) => ({
      result: gameMsg,
      count: 0,
      randomNumber: Math.floor(Math.random() * (this.props.max - this.props.min)) + this.props.min,
    }))

  };

  handleSubmit = (e) => {
    e.preventDefault();
    // console.warn(`🚀 ~ e:`, e, this.state.number);

    // ! 👇 так неправильно!
    // this.setState({
    //   count: this.state.count + 1,
    // })
    // надо так:
    this.setState((state) => ({
      count: state.count + 1,
    }))


    this.setState((state) => {
      // debugger;
      if (!state.userNumber) {
        return {
          result: `введите число: ${state.randomNumber}`,
        };
      }
      if (state.userNumber > state.randomNumber) {
        // setTimeout(()=>{
        //   this.setState({
        //     userNumber: '',
        //   });        
        // }, 0)
        return {
          result: `${state.userNumber} > загаданного`,
        }
      }
      if (state.userNumber < state.randomNumber) {
        return {
          result: `${state.userNumber} < загаданного`,
        }
      }
      return {
        userNumber: '',
        result: `${youWinStartMsg} было загадано: ${state.userNumber},
          попыток ${this.state.count}
        `,
      };
    })
  };
  handleInput = (e) => {
    console.warn(`🚀 ~ handleInput e.target.value:`, e.target.value);
  };
  handleChange = (e) => {
    this.setState({
      userNumber: e.target.value,
    });
    /* если нет обращения к state, то setState проще так☝️
    console.warn(`🚀 ~ handleChange e.target.value:`, e.target.value);
    // ! this.state.userNumber = e.target.value;
    // this.setState({
    //   userNumber: e.target.value,
    // });
    this.setState((prev, props) => {
      console.log('this.setState state:', prev, 'props:', props);
      return ({
        userNumber: e.target.value,
      });
    },()=>{ // вызывается после обновления стейта
      console.log("после setState", this.state)
    });
    */
  };

  render() {
    console.log('render props:', this.props);
    console.log('render state:', this.state);
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result}</p>

        <form className={style.form}
          onSubmit={this.handleSubmit}
        >
          <label className={style.label} htmlFor='user_number'>
            Угадай число
          </label>

          <input className={style.input} type='number' id='user_number'
            // onInput={this.handleInput}
            onChange={this.handleChange}
            value={this.state.userNumber}
          />

          {
            this.state.result.startsWith(youWinStartMsg) ?
            <button className={style.btn} type='button'
              onClick={this.handleRepeat}
            >повторить</button> :
            <button className={style.btn} type='submit'
            >Угадать</button>
          }
          
        </form>
      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};
