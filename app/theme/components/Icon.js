// @flow

import variable from '../variables/dark';

export default (variables /* : * */ = variable) => {
  const iconTheme = {
    '.NativeBase.Footer': {
      fontSize: 11,
    },
    fontSize: variables.iconFontSize,
    color: variable.textColor,
  };

  return iconTheme;
};
