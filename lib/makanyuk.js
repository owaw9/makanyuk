'use babel';

import MakanyukView from './makanyuk-view';
import { CompositeDisposable } from 'atom';

export default {

  makanyukView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.makanyukView = new MakanyukView(state.makanyukViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.makanyukView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'makanyuk:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.makanyukView.destroy();
  },

  serialize() {
    return {
      makanyukViewState: this.makanyukView.serialize()
    };
  },

  toggle() {
    console.log('Makanyuk was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
