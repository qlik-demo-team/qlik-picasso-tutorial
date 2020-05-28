import React, { useRef, useState, useEffect } from 'react';
import Dropdown from './Dropdown';

import qDocPromise from './qDocPromise';
import hypercube from './hypercube';
import listObject from './listObject';

import picasso from 'picasso.js';
import picassoQ from 'picasso-plugin-q';
picasso.use(picassoQ);
import settings from './settings';

const Home = () => {
  const elementNode = useRef(null);
  const [qListObject, setQListObject] = useState(null);
  const [options, setOptions] = useState([])

  const updateOptions = (layout) => {
    const lOptions = layout.qListObject.qDataPages[0].qMatrix.map((arr) => {
      return arr[0];
    })
    setOptions(lOptions);
  }

  useEffect(() => {
    qDocPromise.then((doc) => {
      let _pic;
      doc.createSessionObject(hypercube).then((hc) => {
        hc.getLayout().then((layout) => {
          _pic = picasso.chart({
            element: elementNode.current,
            data: [{
              type: 'q',
              key: 'qHyperCube',
              data: layout.qHyperCube
            }],
            settings
          })
        })

        hc.on('changed', () => {
          hc.getLayout().then((layout) => {
            _pic.update({
              data: [{
                type: 'q',
                key: 'qHyperCube',
                data: layout.qHyperCube
              }],
            })
          })
        })
      })
    
      // List Object
      doc.createSessionObject(listObject).then((lo) => {
        setQListObject(lo);
        lo.getLayout().then((layout) => {
          updateOptions(layout);
        })
  
        lo.on('changed', () => {
          lo.getLayout().then((layout) => {
            updateOptions(layout);
          })
        })
      })
    })
  }, [])
  


  const makeSelection = (arr) => {
    qListObject.selectListObjectValues('/qListObjectDef', arr, false, false)
  }
  

  return (
    <div className="parent">
      <Dropdown options={options} makeSelection={makeSelection} />
      <div style={{ padding: '20px'}} >
        <div ref={elementNode} style={{ height: '400px', width: '600px', minWidth: 'min(600px, 90vw)', position: 'relative'}}></div>
      </div>
    </div>
  )
}

export default Home;