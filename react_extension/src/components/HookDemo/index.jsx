import React from 'react'
import './index.css'
import useDraggable from './useDraggable'

const list = [
  {
    src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2154873129,4262593432&fm=15&gp=0.jpg',
    title: '喜羊羊',
  },
  {
    src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2285812869,963687584&fm=15&gp=0.jpg',
    title: '懒羊羊',
  },
  {
    src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2493351790,2661396699&fm=15&gp=0.jpg',
    title: '灰太狼',
  }
]

function cls(def, ...conditions) {
  const list = [def];
  conditions.forEach(cond => {
    if (cond[0]) {
      list.push(cond[1]);
    }
  });
  return list.join(" ");
}

export default function HookDemo() {
  return (
    <div>
      <DraggableList list={list} />
    </div>
  )
}

function DraggableList({list}) {
  const {dragList, createDropperProps, createDraggerProps} = useDraggable(list)
  return dragList.map((item, i) => {
    if (item.type === 'BAR') {
      return <Bar id={i} {...createDropperProps(i)} key={item.id} />
    } else {
      return <Draggable {...createDraggerProps(i, item.id)}>
        <Card {...item.data} />
      </Draggable>
    }
  })
}

function Draggable({children, eventHandlers, dragging, id}) {
  return (
    <div 
      {...eventHandlers} 
      draggable={true} 
      className={cls("draggable", [dragging === id, 'dragging'])}>
      {children}
    </div>
  )
}

function Bar(id, dragging, dragOver, eventHandlers) {
  if (id === dragging + 1) {
    return null
  }
  return <div {...eventHandlers} className={cls('draggable-bar', [dragOver === id, 'dragOver'])}>
    <div/>
  </div>
}

function Card({src, title}) {
  return (
    <div className="card">
      <img src={src} />
      <span>{title}</span>
    </div>
  )
}
