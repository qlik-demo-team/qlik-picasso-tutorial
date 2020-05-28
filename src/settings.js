const settings = {
  scales: {
    y: {
      data: { field: 'Margin' },
      invert: true,
      include: [0]
    },
    c: {
      data: { field: 'Margin' },
      type: 'color'
    },
    t: { data: { extract: { field: '[Product Group Desc]' } }, padding: 0.3 },
  },
  components: [{
    type: 'axis',
    dock: 'left',
    scale: 'y'
  },{
    type: 'axis',
    dock: 'bottom',
    scale: 't'
  },{
    key: 'bars',
    type: 'box',
    data: {
      extract: {
        field: '[Product Group Desc]',
        props: {
          start: 0,
          end: { field: 'Margin' }
        }
      }
    },
    settings: {
      major: { scale: 't' },
      minor: { scale: 'y' },
      box: {
        fill: { scale: 'c', ref: 'end' }
      }
    }
  }]
}

export default settings;