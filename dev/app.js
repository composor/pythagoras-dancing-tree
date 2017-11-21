import {h, Component} from 'composi'
import {title} from './components/title'
import {Tree} from './components/pythagoras-tree'

title.update()

const tree = new Tree({
  container: 'section'
})