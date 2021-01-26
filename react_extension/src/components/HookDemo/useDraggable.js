import React from 'react'

const DRAGGABLE = 'DRAGGABLE'
const BAR = 'BAR'

function drgggable(item, id) {
  return {
    type: DRAGGABLE,
    id,
    data: item
  }
}

function insertBars(list) {
  let i = 0
  const newBar = () => {
    return {
      type: BAR,
      id: i++
    }
  }
  return [newBar()].concat(...list.map(item => {
    return [drgggable(item, i++), newBar()]
  }))
}

function clacChanging(list, drag, drop) {
  list = list.slice();

  const dragItem = list[drag];

  // dir > 0从下往上 <0 从上往下
  const dir = drag > drop ? -2 : 2;
  // drop的地方是bar
  const end = dir > 0 ? drop - 1 : drop + 1;

  for (let i = drag; i != end; i += dir) {
    list[i] = list[i + dir];
  }

  list[end] = dragItem;
  return list;
}

export default function useDraggable(list) {

  const [dragList, setDragList] = React.useState(() => {
    return insertBars(list)
  })

  const [dragOver, setDragOver] = React.useState(null)
  const [dragging, setDragging] = React.useState(null)

  return {
    dragList,
    createDropperProps: id => {
      return {
        dragging,
        dragOver,
        eventHandlers: {
          onDragOver: e => {
            e.preventDefault()
            setDragOver(id)
          },
          onDragLeave: e => {
            e.preventDefault()
            setDragOver(null)
          },
          onDrop: e => {
            e.preventDefault()
            setDragOver(null)
            setDragList(list => {
              return clacChanging(list, dragging, id)
            })
          }
        }
      }
    },
    createDraggerProps: (id, key) => {
      return {
        id,
        key,
        dragging,
        eventHandlers: {
          onDragStart: () => {
            setDragging(id)
          },
          onDragEnd: () => {
            setDragging(null)
          }
        }
      }
    }
  }
}