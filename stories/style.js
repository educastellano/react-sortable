export default 
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
    .list div[draggable=true], .Placeholder {
        padding: 8px;
        border: 1px solid;
        border-bottom: none;
        cursor: pointer;
    }
    .list div[draggable=true]:last-child {
        border-bottom: 1px solid;
    }
    .arrow {
        font-size: 24px;
    }
`