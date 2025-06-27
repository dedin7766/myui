import {useState} from 'react';

type State = {
  count: number;
};

export function useAppState() {
  const [state, setState] = useState<State>({count: 0});
  return {state, setState};
}
