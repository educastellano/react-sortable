import React                from 'react'

export default class Sortable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            children: [],
            sorting: null
        }
    }
    componentWillMount() {
        this.setState({
            children: this._mapDraggableChildren(this.props.children)
        }) 
    }
    componentWillReceiveProps(nextProps) {
        if ('children' in nextProps) {
            this.setState({
                children: this._mapDraggableChildren(nextProps.children)
            }) 
        }
    }
    _mapDraggableChildren(children) {
        return React.Children.map(children, (child, index) => {
            return (
                <div draggable='true'
                     onDragStart={this.onItemDragStart.bind(this, child)}
                     onDragEnd={this.onItemDragEnd.bind(this, child)}
                     onDragEnter={this.onItemDragEnter.bind(this, child)}>
                    {child}
                </div>
            )
        })
    }
    onItemDragStart(component, e) {
        e.dataTransfer.setData('component_props', JSON.stringify(component.props))
        this.setState({
            sorting: component
        })
    }
    onItemDragEnd(component, e) {
        if (this.props.enabled && this.props.onSort) {
            let children = this.state.children.map((draggable) => {
                return draggable.props.children
            })
            this.props.onSort(children)
        }
        this.setState({
            sorting: null
        })
    }
    onItemDragEnter(component, e) {
        if (this.props.enabled && component !== this.state.sorting) {
            let sortingIndex = this.indexOf(this.state.sorting)     // TODO probably no need to be O(n)...
            let dropIndex = this.indexOf(component)                 // TODO probably no need to be O(n)...
            if (sortingIndex !== -1 && dropIndex !== -1) {
                let sortingComponent = this.state.children.splice(sortingIndex, 1) // remove
                if (sortingComponent.length) {
                    this.state.children.splice(dropIndex, 0, sortingComponent[0]) // insert
                    this.forceUpdate()
                }
            }
        }
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
    indexOf(component) {
        let index = 0
        for (let child of this.state.children) {
            if (child.props.children === component) {
                return index
            }
            index++
        }
        return -1
    }
    render() {
        return (
            <div className={'Sortable ' + this.props.className} 
                onDrop={this.onDrop.bind(this)} 
                onDragOver={this.onDragOver.bind(this)}>
                {this.state.children}
            </div>
        )
    }
}

Sortable.defaultProps = {
    enabled: true
}