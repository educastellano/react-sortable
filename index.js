import React                from 'react'

export default class Sortable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sorting: false
        }
    }
    onItemDragStart(component, e) {
        e.dataTransfer.setData('component_props', JSON.stringify(component.props))
        this.setState({
            sorting: true
        })
    }
    onItemDragEnd(component, e) {
        if (this.props.onSort) {
            this.props.onSort(this.props.children)
        }
        this.setState({
            sorting: false
        })
    }
    onDrop(e) {
        let data = e.dataTransfer.types.reduce((p, type) => {
            p[type] = e.dataTransfer.getData(type)
            return p
        }, {})
        if (!this.state.sorting) {
            if (this.props.onDrop) {
                this.props.onDrop(data, '*TODO: index here*')
            }            
        }
    }
    onDragOver(e) {
        e.preventDefault()
    }
    render() {
        let sortableChildren = React.Children.map(this.props.children, (child, index) => {
            return (
                <div draggable='true'
                     onDragStart={this.onItemDragStart.bind(this, child)}
                     onDragEnd={this.onItemDragEnd.bind(this, child)}>
                    {child}
                </div>
            )
        })
        return (
            <div className={'Sortable ' + this.props.className} 
                onDrop={this.onDrop.bind(this)} 
                onDragOver={this.onDragOver.bind(this)}>
                {sortableChildren}
            </div>
        )
    }
}
