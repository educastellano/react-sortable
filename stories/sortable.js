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
            action('onSort()')(components)
            console.log('*** onSort() *** ', components.map(c => c.props.children))
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
            action('onSort()')(components)
            console.log('*** onSort() *** ', components, components.map(c => c.props.icon))
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
        let onSort = (components) => {
            action('onSort()')(components)
            console.log('*** onSort() *** ', components)
        }
        let onLeftDrop = (e, data, index) => {
            action('onLeftDrop()')(data, index)
            let componentProps = JSON.parse(data.component_props)
            console.log('*** Dropped on left list', componentProps.children, ', on index', index)
        }
        let onRightDrop = (e, data, index) => {
            action('onRightDrop()')(data, index)
            let componentProps = JSON.parse(data.component_props)
            console.log('*** Dropped on right list', componentProps.children, ', on index', index)
        }
        return (
            <div className='lists'>
                <style>{css}</style>
                <div className='list'>
                    <h2>Sortable Fruits</h2>
                    <Sortable onSort={onSort} onDrop={onLeftDrop}>
                        <div>Apple</div>
                        <div>Orange</div>
                        <div>Banana</div>
                        <div>Mango</div>
                        <div>Melon</div>
                    </Sortable>
                </div>
                <div className='arrow'>{'\u2194'}</div>
                <div className='list'>
                    <h2>Sortable Fruits</h2>
                    <Sortable onSort={onSort} onDrop={onRightDrop}>
                        <div>Pineapple</div>
                        <div>Pitaya</div>
                        <div>Mangosteen</div>
                        <div>Durian</div>
                    </Sortable>
                </div>
            </div>
        )
    })
