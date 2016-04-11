import React                 from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Sortable              from '../index' 
import { Draggable }         from 'react-drag-and-drop'
import { Droppable }         from 'react-drag-and-drop'

var css = 
`
    .lists {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .list { 
        background: lightsalmon;
        width: 256px;
        padding: 20px;
    }
    .Sortable div {
        padding: 5px;
        border: 1px solid;
    }
`

storiesOf('Sortable', module)
    .add('with simple sort', () => {
        let onSort = (components) => {
            console.log('*** onSort() *** ', components.map((c) => c.props.children))
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
    .add('dropping new items', () => {
        let onSort = (components) => {
            console.log('*** onSort() *** ', components)
        }
        let onDrop = (data, index) => {
            console.log('*** Dropped', data.fruit, ', on index', index)
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
                        <div>Pineapple</div>
                    </Sortable>
                </div>
                <div>{'<--'}</div>
                <div className='list'>
                    <h2>Fruits</h2>
                    <div>
                        <Draggable type='fruit' data={'pitaya'}>Pitaya</Draggable>
                        <Draggable type='fruit' data={'mangosteen'}>Mangosteen</Draggable>
                        <Draggable type='fruit' data={'durian'}>Durian</Draggable>
                    </div>
                </div>
            </div>
        )
    })
    .add('dragging items outside', () => {
        let onSort = (components) => {
            console.log('*** onSort() *** ', components)
        }
        let onDrop = (nothing, e) => {
            let componentProps = JSON.parse(e.dataTransfer.getData('component_props'))
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
                        <div>Banana</div>
                        <div>Mango</div>
                        <div>Melon</div>
                        <div>Pineapple</div>
                    </Sortable>
                </div>
                <div>{'-->'}</div>
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
            console.log('*** onSort() *** ', components)
        }
        let onLeftDrop = (data, index) => {
            let componentProps = JSON.parse(data.component_props)
            console.log('*** Dropped on left list', componentProps.children, ', on index', index)
        }
        let onRightDrop = (data, index) => {
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
                <div>{'<-->'}</div>
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
