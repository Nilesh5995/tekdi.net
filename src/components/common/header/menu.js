import React, {useReducer} from 'react';
import classNames from 'classnames';
import {CSSTransition} from 'react-transition-group';
import {Link} from 'gatsby';

function menuReducer(state, action) {
  switch(action.type) {
    case 'show':
      return Object.assign({}, state, {
        [state.lastKey]: false,
        [action.key]: !state[action.key],
        lastKey: action.key
      });

    case 'hide':
      return Object.assign({}, state, {
        [action.key]: false,
        lastKey: ''
      });

    default:
      return state;
  }
}

const MainMenu = ({items}) => {

  const itemsKeys = items.map(item => item.key);
  const initialState = Object.assign(...itemsKeys.map(k => ({ [k]: false })));
  initialState.lastKey = '';

  const [menuState, dispatch] = useReducer(menuReducer, initialState);

  var url =  typeof window !== 'undefined' ? window.location.pathname : '';
  url = url.replace(/\/$/, "");
  return (
    <nav className="mainmenu" role="navigation" aria-label="main-navigation">
      <div id="navMenu" className="navbar-menu ">
        <ul className="menu-items unstyled">
          {items.map(item => {
            let props = {};

            if (item.link === '#' ||item.className === 'parent' ) {
              props.onClick = e => {
                e.preventDefault();
                dispatch({type: 'show', key: item.key});
                return false;
              };
              props.onMouseLeave = e => {
                e.preventDefault();
                dispatch({type: 'hide', key: item.key});
                return true;
              };
              props.onMouseEnter = e => {
                e.preventDefault();
                dispatch({type: 'show', key: item.key});
                return false;
              };
            }

            let submenuD;
            let isMenuActive = false;
            if (item.link && item.submenus) {
              submenuD = item.submenus.map(submenu => {
                const isMenuActiveInternal = (url === submenu.link + '/') || (url === submenu.link);
                if (isMenuActiveInternal) {
                  isMenuActive = isMenuActiveInternal;
                }
                let submenuProps = {}
                submenuProps.onMouseLeave = e => {
                  e.preventDefault();
                  dispatch({type: 'hide', key: item.key});
                  return true;
                };
                submenuProps.onMouseEnter = e => {
                  e.preventDefault();
                  dispatch({type: 'show', key: item.key});
                  return false;
                };
                return (
                  <li key={submenu.label} className={classNames({'active': isMenuActiveInternal})}>
                    {/* <a href={submenu.link}>
                      {submenu.label}
                    </a> */}
                    <Link to={submenu.link} {...submenuProps}> {submenu.label} </Link>
                  </li>
                );
              });
            }

            const classNameForItem = classNames(
              'menu-item',
              {
                'parentmenu-active': isMenuActive,
                'parentmenu-open': menuState[item.key],
                'menu-active': item.link === url
              },
              `mainmenu-${item.className}`
            );
            return (
              <li key={item.label} className={classNameForItem}>
                {/* <a href={item.link} title={item.title} {...props}>
                  <span>{item.label}</span>
                </a> */}
                <Link to={item.link} {...props}> {item.label} </Link>
                {submenuD && <CSSTransition in={menuState[item.key]} timeout={300} classNames="submenu" >
                  <div className="submenu">
                      <ul>
                        {submenuD}
                      </ul>
                  </div>
                </CSSTransition>}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

MainMenu.displayName = 'mainmenu';

export default MainMenu;