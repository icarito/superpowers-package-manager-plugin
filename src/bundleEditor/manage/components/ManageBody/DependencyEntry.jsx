import _ from 'lodash';
import React from 'react';
import {
  ButtonGroup,
  Glyphicon,
  Button,
} from 'react-bootstrap';

function DependencyEntry({ name, version, bindings, onButtonClick }) {
  return (
    <tr>
      <td>{name}</td>
      <td>{version}</td>
      <td style={{ width: '100%' }}>
        {_.map(bindings, (binding) => binding.propertyName).filter((prop) => prop).join(', ')}
      </td>
      <td>
        <ButtonGroup style={{ minWidth: '7em' }}>
          <Button
            bsSize='xsmall'
            bsStyle={'info'}
            onClick={() => onButtonClick(name, 'view')}
          >
          <Glyphicon glyph='eye-open'/>
          </Button>
          <Button
            bsSize='xsmall'
            bsStyle={'primary'}
            onClick={() => onButtonClick(name, 'edit')}
          >
            <Glyphicon glyph='edit'/>
          </Button>
          <Button
            bsSize='xsmall'
            bsStyle={'danger'}
            onClick={() => onButtonClick(name, 'delete')}
          >
          <Glyphicon glyph='remove'/>
          </Button>
        </ButtonGroup>
      </td>
    </tr>
  );
}

export default DependencyEntry;
