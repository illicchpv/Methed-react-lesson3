import React from 'react';
import style from './LifeCycle.module.css';
import img from './img/LiveCircle1.png';

export class LifeCycle extends React.Component {
  /*
  ! render
  constructor()
  static getDerivedStateFromProps()
  render()
  -
  !commit
  обновляется дом
  componentDidMount()
  componentWillMount() вызывается перед удалением компонента из дом

  */

  constructor(props) {
    super(props);
    console.warn(`🚀 ~ constructor`);

    // ! только в конструкторе присваивается state
    // ! передавать из props в state тут не надо
    this.state = {
      field: 0,
      haseError: false,
    };

    // !  тут это можно
    // this.handler = this.handler.bind(this);
  }
  // handler() {
  //   this.setState(state => ({
  //     field: state.field + 1,
  //   }));
  // };
  // ! чаще делают так:
  handler = () => {
    this.setState(state => ({
      field: state.field + 1,
    }));
  };

  /*
  Warning: Unsafe legacy lifecycles will not be called for components
  using new component APIs.
  LifeCycle uses getDerivedStateFromProps() but also contains
  the following legacy lifecycles: UNSAFE_componentWillMount

  The above lifecycles should be removed.Learn more about this warning here:
  https://reactjs.org/link/unsafe-component-lifecycles
  */
  static getDerivedStateFromProps(props, state) {
    console.warn(`🚀 ~ getDerivedStateFromProps`);
    // !позволяет изменять состояние объекта при изменении props.
    // !используется редко
    // return {
    //   field: 10,
    // };
    return state;
  }

  componentDidMount() {
    console.warn(`🚀 ~ componentDidMount`);
    // !для подписок на события, таймеры, изменения в dom bom
    // !resize запросы на сервер
    // setInterval(() => {
    //   console.log('timer');
    //   this.setState(state => ({
    //     field: state.field + 1,
    //   }));
    // }, 3000);

    // document.addEventListener('scroll', this.handler);

    // eslint-disable-next-line
    document.title = this.props.prop;
  }

  /*

  !render Updating
  static getDerivedStateFromProps()
  shouldComponentUpdate()
  render()
  -
  !pre-commit
  getSnapshotBeforeUpdate()
  обновляется DOM
  !commit
  componentDidUpdate()

  */
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.warn(`🚀 ~ shouldComponentUpdate`);
    // по возвращаемому значению реакт определяет,
    // надо или нет обновлять компонент
    return true;
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.warn(`🚀 ~ getSnapshotBeforeUpdate`);
    // return null;
    return window.pageYOffset;
  }
  componentDidUpdate(prevProps, prevState, snapShot) {
    console.warn(`🚀 ~ componentDidUpdate`, snapShot);
    window.scrollBy(0, -snapShot);
  }

  // !componentWillMount is deprecated since React 16.9.0,
  // !use UNSAFE_componentWillMount instead,
  // !see https://reactjs.org/docs/react-component.html#unsafe_componentwillmount.
  // !Use https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles
  // !to automatically update your components
  // componentWillMount() {
  UNSAFE_componentWillMount() {
    console.warn(`🚀 ~ UNSAFE_componentWillMount`);
    // ! тут освобождаются ресурсы
    // document.removeEventListener('scroll', this.handler);
  }

  /*

! error
static getDerivedStateFromError()
componentDidCatch()


  */

  static getDerivedStateFromError(err) {
    return { // состояние полсе ошибки
      haseError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    // ! тут можно сделать лог ошибки
  }

  render() {
    console.warn(`🚀 ~ render`);
    if (this.state.haseError) {
      return (<p>error</p>);
    } else {
      return (
        <div>
          <h1 className={style.title}>Жизненный цикл</h1>

          <div id="container"
            className={style.container}
            onClick={() => location.href = '#container'}>
            <div>
              <h2 className={style.title}>Типы</h2>
              <ul className={style.list}>
                <li>Монтирование</li>
                <li>Обновление</li>
                <li>Размонтирование</li>
                <li>Ошибки</li>
              </ul>
            </div>

            <div className='stage'>
              <h2 className={style.title}>Этапы</h2>
              <ul className={style.list}>
                <li>Render</li>
                <li>Pre-commit</li>
                <li>Commit</li>
              </ul>
            </div>
          </div>

          <button className={style.btn}
            onClick={this.handler}
          >click {this.state.field}</button>

          <div className={style.imgContainer}>
            <a href="#img">
              <img id="img" className={style.img} src={img}></img>
            </a>
          </div>
        </div>
      );
    }
  }
}
