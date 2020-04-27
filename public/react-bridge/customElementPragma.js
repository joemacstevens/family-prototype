import React from 'react';

const listeners = Symbol('jsx-web-comp/event-listeners');
const eventPattern = /^onWf/;
const DCPattern = /^wf-/;

const toLowerCamelCase = (str) =>
  str.replace(/^\w/, (chr) => chr.toLowerCase());

const attachEventListeners = (props, element) => (event) => {
  const eventName = toLowerCamelCase(event.replace('on', ''));
  const handler = props[event];

  if (!element[listeners]) {
    element[listeners] = new Map();
  }

  if (!element[listeners].has(eventName)) {
    element.addEventListener(eventName, handler);
    element[listeners].set(eventName, handler);
  }
};

const handleCustomEvents = (props, element) => {
  Object.keys(props)
    .filter((prop) => prop.match(eventPattern))
    .forEach(attachEventListeners(props, element));
};

const handleComplexProps = (props, element) => {
  Object.keys(props)
    .filter(prop => typeof props[prop] === 'object')
    .forEach((prop) => {
      element[prop] = props[prop];
      element.removeAttribute(prop);
    });
}

const reduceProps = props => (acc, curr) => ({
  ...acc,
  [curr]: props[curr],
});

const removeOriginalComplexProps = (props) => {
  return Object.keys(props)
    .filter(prop => typeof props[prop] !== 'object')
    .reduce(reduceProps(props), {});
};

const handleOriginalRef = (props, element) => {
  if(props.ref && typeof props.ref === 'function') {
    props.ref(element);
  }
};

const setRef = (props) => (element) => {
  if (element) {
    handleCustomEvents(props, element);
    handleComplexProps(props, element);
    handleOriginalRef(props, element);
  }
};

export default function wfDOMFactory(type, props, ...children) {
  const isDC = typeof type === 'string' && type.match(DCPattern);
  let newProps = { ...props };

  if (props && isDC) {
    newProps.ref = setRef(props);
    newProps = removeOriginalComplexProps(newProps);
  }

  return React.createElement.apply(null, [type, newProps, ...children]);
}
