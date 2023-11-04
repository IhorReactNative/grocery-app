import React, { useEffect, useState } from 'react';
import { ENTITY_STATUS, EntityProps } from '../types';
import { generateId } from '../../../utils';
import { EntityEditing } from '../components';

interface Props {
  action: (data: EntityProps) => void;
  saving: boolean;
}

const getInitialState = (): EntityProps => ({
  id: generateId(),
  inStock: true,
  priority: 5,
  name: '',
  status: ENTITY_STATUS.have,
});

type Keys = keyof EntityProps;

export const ModalAddNewEntity: React.FC<Props> = ({ action, saving }) => {
  const [state, setState] = useState<EntityProps>(getInitialState());
  const [showNameError, setShowNameError] = useState(false);
  const [isNameEdited, setIsNameEdited] = useState(false);

  useEffect(() => {
    // simple validation, prefer to use validations libs like "formik"
    if (!state.name && isNameEdited) {
      setShowNameError(true);
    } else {
      setIsNameEdited(true);
      setShowNameError(false);
    }
  }, [state.name]);

  const onAdd = () => {
    if (state.name) {
      action(state);
    } else {
      setShowNameError(true);
    }
  };

  const onChange = (field: Keys, value: EntityProps[Keys]) => {
    let payload = (
      field === 'inStock'
        ? { inStock: value, status: value ? ENTITY_STATUS.have : ENTITY_STATUS.runOut }
        : { [field]: value }
    ) as Record<Keys, any>;

    setState((oldState) => ({ ...oldState, ...payload }));
  };

  return <EntityEditing isNameError={showNameError} {...state} onChange={onChange} onAdd={onAdd} saving={saving} />;
};
