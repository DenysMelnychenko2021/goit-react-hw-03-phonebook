import { Component } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.scss';

const modalRoot = document.getElementById('modal-root');

export class Modal extends Component {
  componentDidMount() {
    console.log('componentDidMount');

    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');

    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    console.log(e.code);

    e.code === 'Escape' && this.props.closeModal();
  };
  handleBackdrop = e => {
    console.log('Кликнули в Backdrop');
    console.log('Target', e.target);
    console.log('CurrentTarget', e.currentTarget);

    e.target === e.currentTarget && this.props.closeModal();
  };

  render() {
    return createPortal(
      <div className={s.Modal__backdrop} onClick={this.handleBackdrop}>
        <div className={s.Modal__content}>{this.props.children}</div>
      </div>,
      modalRoot,
    );
  }
}
