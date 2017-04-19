export function getJsonOptions (id) {
  let style = {}
  switch (id) {
    case '1':
      style = {
        pip: {
          active: true,
          width: '300px',
          height: '176px',
          position: 'bottom-right',
          margin: '25px'
        }
      }
    break;
    case '2':
      style = {
        umoh: {
          active: true
        }
      }
    break;
    case '3':
      style = {
        stp: {
          active: true
        }
      }
    break;
    case '4':
      style = {
        eac: {
          active: true
        }
      }
    break;
    case '5':
      style = {
        eos: {
          active: true
        }
      }
    break;
    case '6':
      style = {
        imod: {
          active: true,
          width: 800,
          height: 470
        }
      }
    break;
  }

  let jsonOptions = {
    style: style,
    units: {}
  }

  return jsonOptions
}
