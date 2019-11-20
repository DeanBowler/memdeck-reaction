import { useLocation, useHistory } from 'react-router';
import { useMemo } from 'react';

type ParamTypeTransformer<T> = (value: string | undefined) => T | undefined;

interface IParamTypes {
  String: ParamTypeTransformer<string>;
  Number: ParamTypeTransformer<number>;
}

export const ParamTypes: IParamTypes = {
  String: (value: string | undefined) => value,
  Number: (value: string | undefined) => (value ? Number(value) : undefined),
};

const useQueryParam = <T = string>(
  paramName: string,
  type: ParamTypeTransformer<T> = ParamTypes.String as any,
): [T | undefined, (value: T) => void] => {
  const location = useLocation();
  const history = useHistory();
  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const param = params.get(paramName);

  const setParam = (value: T) => {
    params.set(paramName, `${value}`);
    location.search = params.toString();
    history.push(`${location.pathname}?${params.toString()}`);
  };

  return [param ? type(param) : undefined, setParam];
};

export default useQueryParam;
