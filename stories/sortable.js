import React                 from 'react';
import { Draggable }         from 'react-drag-and-drop'
import { Droppable }         from 'react-drag-and-drop'
import { storiesOf, action } from '@kadira/storybook';
import Sortable              from '../index' 
import css                   from './style'

let Fruit = (props) => <div className='Fruit'>{ props.icon } {props.children}</div>

storiesOf('Sortable', module)
    .add('with simple sorting', () => {
        let onSort = (components) => {
            let list = components.map(c => c.props.children)
            action('onSort()')(list)
            console.log('*** onSort() *** ', list)
        }
        return (
            <div className='list'>
                <style>{css}</style>
                <h2>Sortable Fruits</h2>
                <Sortable onSort={onSort}>
                    <div>Apple</div>
                    <div>Orange</div>
                    <div>Banana</div>
                    <div>Mango</div>
                    <div>Melon</div>
                    <div>Pineapple</div>
                </Sortable>
            </div>
        )
    })
    .add('with components', () => {
        let onSort = (components) => {
            let list = components.map(c => c.props.icon)
            action('onSort()')(list)
            console.log('*** onSort() *** ', list)
        }
        return (
            <div className='list'>
                <style>{css}</style>
                <h2>Sortable Fruits</h2>
                <Sortable onSort={onSort}>
                    <Fruit icon='🍓'>Strawberry</Fruit>
                    <Fruit icon='🍍'>Pineapple</Fruit>
                    <Fruit icon='🍌'>Banana</Fruit>
                    <Fruit icon='🍎'>Apple</Fruit>
                    <Fruit icon='🍋'>Lemon</Fruit>
                </Sortable>
            </div>
        )
    })
    .add('with sorting disabled', () => {
        let onSort = (components) => {
            action('onSort()')(components)
            console.log('*** onSort() *** ', components.map(c => c.props.children))
        }
        return (
            <div className='list'>
                <style>{css}</style>
                <h2>Sortable Fruits</h2>
                <Sortable onSort={onSort} enabled={false}>
                    <div>Apple</div>
                    <div>Orange</div>
                    <div>Banana</div>
                    <div>Mango</div>
                    <div>Melon</div>
                    <div>Pineapple</div>
                </Sortable>
            </div>
        )
    })
    .add('dropping new items', () => {
        let onSort = (components) => {
            action('onSort()')(components)
            console.log('*** onSort() *** ', components)
        }
        let onDrop = (e, data, index) => {
            action('onDrop()')(e, data, index)
            console.log('*** Dropped', data.fruit, 'on index', index, '****')
        }
        return (
            <div className='lists'>
                <style>{css}</style>
                <div className='list'>
                    <h2>Sortable Fruits</h2>
                    <Sortable onSort={onSort} onDrop={onDrop}>
                        <div>Apple</div>
                        <div>Orange</div>
                        <div>Banana</div>
                        <div>Mango</div>
                        <div>Melon</div>
                    </Sortable>
                </div>
                <div className='arrow'>{'\u2190'}</div>
                <div className='list'>
                    <h2>Fruits</h2>
                    <div>
                        <Draggable type='fruit' data={'pitaya'}>Pitaya</Draggable>
                        <Draggable type='fruit' data={'mangosteen'}>Mangosteen</Draggable>
                        <Draggable type='fruit' data={'durian'}>Durian</Draggable>
                        <Draggable type='fruit' data={'pineapple'}><Fruit icon='🍍'>Pineapple</Fruit></Draggable>
                    </div>
                </div>
            </div>
        )
    })
    .add('dragging items outside', () => {
        let onSort = (components) => {
            action('onSort()')(components)
            console.log('*** onSort() *** ', components)
        }
        let onDrop = (nothing, e) => {
            let componentProps = JSON.parse(e.dataTransfer.getData('component_props'))
            action('Dragged out')(componentProps)
            console.log('Dragged out', componentProps.children)
        }
        return (
            <div className='lists'>
                <style>{css}</style>
                <div className='list'>
                    <h2>Sortable Fruits</h2>
                    <Sortable onSort={onSort}>
                        <div>Apple</div>
                        <div>Orange</div>
                        <div>Mango</div>
                        <Fruit icon='🍌'>Banana</Fruit>
                        <div>Melon</div>
                        <div>Pineapple</div>
                    </Sortable>
                </div>
                <div className='arrow'>{'\u2192'}</div>
                <div className='list'>
                    <h2>Fruits</h2>
                    <Droppable onDrop={onDrop}>
                        <div>Pitaya</div>
                        <div>Mangosteen</div>
                        <div>Durian</div>
                    </Droppable>
                </div>
            </div>
        )
    })
    .add('with 2 sortable lists', () => {
        class Demo extends React.Component {
            constructor(props) {
                super(props)
                this.state = {
                    left: ['Apple', 'Orange', 'Banana', 'Mango', 'Melon'],
                    right: ['Pineapple', 'Pitaya', 'Mangosteen', 'Durian']
                }
            }
            onSort(list, components) {
                this.setState({
                    [list]: components.map(c => c.props.children)
                })
            }
            onLeftDrop(e, data, index) {
                let props = JSON.parse(data.component_props)
                this.add('left', props.children, index)
                this.remove('right', props.children)
            }
            onRightDrop(e, data, index) {
                let props = JSON.parse(data.component_props)
                this.add('right', props.children, index)
                this.remove('left', props.children)
            }
            add(list, fruit, index) {
                this.state[list].splice(index, 0, fruit)
                this.forceUpdate()
            }
            remove(list, fruit) {
                for (let i=0; i<this.state[list].length; i++) {
                    if (this.state[list][i] === fruit) {
                        this.state[list].splice(i, 1)
                        this.forceUpdate()
                        break
                    }
                }
            }
            render() {
                let left = this.state.left.map(fruit => {
                    return <div key={fruit}>{fruit}</div>
                })
                let right = this.state.right.map(fruit => {
                    return <div key={fruit}>{fruit}</div>
                })
                return (
                    <div className='lists'>
                        <style>{css}</style>
                        <div className='list'>
                            <h2>Sortable Fruits</h2>
                            <Sortable onSort={this.onSort.bind(this, 'left')} onDrop={this.onLeftDrop.bind(this)}>
                                { left }
                            </Sortable>
                        </div>
                        <div className='arrow'>{'\u2194'}</div>
                        <div className='list'>
                            <h2>Sortable Fruits</h2>
                            <Sortable onSort={this.onSort.bind(this, 'right')} onDrop={this.onRightDrop.bind(this)}>
                                { right }
                            </Sortable>
                        </div>
                    </div>
                )
            }
        }

        return (
            <Demo />
        )

    })
    .add('with nested lists', () => {
        let onSortGroup = (components) => {
            let list = components.map(c => c.props.name)
            action('onSortGroup()')(list)
            console.log('*** onSortGroup() *** ', list)
        }
        let onSort = (components) => {
            let list = components.map(c => c.props.icon)
            action('onSort()')(list)
            console.log('*** onSort() *** ', list)
        }
        let Group = ({ name, children, onSort }) => 
            <div className='Group'>
                <div className='Group__name'>
                    {name}
                </div>
                <Sortable onSort={onSort} type='fruits'>
                    {children}
                </Sortable>
            </div>
        return (
            <div className='list'>
                <style>{css}</style>
                <h2>Sortable Fruits</h2>
                <Sortable onSort={onSortGroup} type='groups'>
                    <Group onSort={onSort} name='Group A'>
                        <Fruit icon='🍓'>Strawberry</Fruit>
                        <Fruit icon='🍍'>Pineapple</Fruit>
                        <Fruit icon='🍈'>Melon</Fruit>
                        <Fruit icon='🍉'>Watermelon</Fruit>
                    </Group>
                    <Group onSort={onSort} name='Group B'>
                        <Fruit icon='🍌'>Banana</Fruit>
                        <Fruit icon='🍎'>Apple</Fruit>
                        <Fruit icon='🍑'>Peach</Fruit>
                    </Group>
                    <Group onSort={onSort} name='Group C'>
                        <Fruit icon='🍋'>Lemon</Fruit>
                        <Fruit icon='🍊'>Orange</Fruit>
                        <Fruit icon='🥝'>Kiwi</Fruit>
                    </Group>
                </Sortable>
            </div>
        )
    })
