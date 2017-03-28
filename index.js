import React from 'react'

const Placeholder = (props) => <div className={props.className}>{'\u00A0'}</div>

export default class Sortable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            children: [],
            sorting: null,
            placeholderIndex: -1
        }
        this._placeholder = <Placeholder className={this.props.classPlaceholder} key='__placeholder__' />
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
            let sortingIndex = this.indexOf(this.state.sorting)
            let dropIndex = this.indexOf(component)
            if (sortingIndex !== -1 && dropIndex !== -1) {
                // remove
                let sortingComponent = this.state.children.splice(sortingIndex, 1) 
                if (sortingComponent.length) {
                    // insert
                    this.state.children.splice(dropIndex, 0, sortingComponent[0])
                    this.forceUpdate()
                }
            }
            else if (sortingIndex === -1 && dropIndex !== -1) {
                // remove placeholder
                if (this.state.placeholderIndex !== -1) {
                    this.state.children.splice(this.state.placeholderIndex, 1)    
                }
                this.state.placeholderIndex = dropIndex
                // insert placeholder
                this.state.children.splice(dropIndex, 0, this._placeholder)
                this.forceUpdate()
            }
            else {}
        }
    }
    onDrop(e) {
        let data = e.dataTransfer.types.reduce((p, type) => {
            p[type] = e.dataTransfer.getData(type)
            return p
        }, {})
        if (!this.state.sorting) {
            if (this.props.onDrop) {
                this.props.onDrop(e, data, this.state.placeholderIndex)
            }            
        }
        this.removePlaceholder()
    }
    onDragLeave(e) {
        let _ = e.currentTarget.getBoundingClientRect()
        if (e.clientX < _.left || 
            e.clientY < _.top ||
            e.clientX > _.left + _.width || 
            e.clientY > _.top + _.height) {
            // if dragging outside the sortable component, 
            // we remove the placeholder
            this.removePlaceholder()
        }
    }
    onDragOver(e) {
        e.preventDefault()
    }
    removePlaceholder() {
        if (this.state.placeholderIndex !== -1) {
            this.state.children.splice(this.state.placeholderIndex, 1)    
            this.state.placeholderIndex = -1
            this.forceUpdate()
        }
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
            <div className={this.props.className} 
                onDrop={this.onDrop.bind(this)} 
                onDragOver={this.onDragOver.bind(this)}
                onDragLeave={this.onDragLeave.bind(this)}>
                {this.state.children}
            </div>
        )
    }
}

Sortable.defaultProps = {
    className: 'Sortable',
    classPlaceholder: 'Placeholder',
    enabled: true
}
