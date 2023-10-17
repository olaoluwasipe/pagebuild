import React, {useState, useEffect} from 'react';
import grapejs from 'grapesjs';
import gjsplugin from "grapesjs-blocks-basic";
import { useParams } from 'react-router-dom';
import { API_HOST } from './api_utils';
import "./styles/styles.css";

const Editor = () => {
  const [editor, setEditor] = useState(null);
  const {pageId} = useParams();
  console.log('pageId :>>>', pageId)  

  useEffect(() => {
    return () => {
      const editor = grapejs.init({
        container: '#editor',
        storageManager: false,
        blockManager: {
          appendTo: '#blocks',
        },
        storageManager: {
          type: 'remote',
          autosave: true,
          stepsBeforeSave: 3,
          contentTypeJson: true,
          storeComponents: true,
          storeStyles: true,
          storeHtml: true,
          storeCss: true,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000'
          },
          id: 'mycustom-',
          options: {
            remote: {
              urlStore: `${API_HOST}/pages/${pageId}/content`,
              urlLoad: `${API_HOST}/pages/${pageId}/content`,
            }
          }
        },
        styleManager: {
          appendTo: '#styles-container',
          sectors: [
            {
              name: 'Dimension',
              open: false,
              buildProps: ['width', 'min-height', 'padding'],
              properties: [
                {
                  type: 'integer',
                  name: 'The width',
                  property: 'width',
                  units: ['px', '%'],
                  defaults: 'auto',
                  min: 0,
                },
              ],
            },
          ],
        },
        layerManager: {
          appendTo: '#layers-container',
        },
        traitManager: {
          appendTo: '#trait-container',
        },
        selectorManager: {
          appendTo: '#styles-container',
        },
        panels: {
          defaults: [
            {
              id: 'basic-actions',
              el: '.panel__basic-actions',
              buttons: [
                {
                  id: 'visibility',
                  active: true, // active by default
                  className: 'btn-toggle-borders',
                  label: '<i class="fa fa-clone"></i>',
                  command: 'sw-visibility', // Built-in command
                },
              ],
            },
            {
              id: 'panel-devices',
              el: '.panel__devices',
              buttons: [
                {
                  id: 'device-desktop',
                  label: '<i class="fa fa-television"></i>',
                  command: 'set-device-desktop',
                  active: true,
                  togglable: false,
                },
                {
                  id: 'device-mobile',
                  label: '<i class="fa fa-mobile"></i>',
                  command: 'set-device-mobile',
                  togglable: false,
                },
              ],
            },
          ],
        },
        deviceManager: {
          devices: [
            {
              name: 'Desktop',
              width: '',
            },
            {
              name: 'Mobile',
              width: '320px',
              widthMedia: '480px',
            },
          ],
        },
        plugins: [gjsplugin],
        pluginsOpts: {
          [gjsplugin]: {},
        }
      });
      // Commands
      editor.Commands.add('set-device-desktop', {
        run: (editor) => editor.setDevice('Desktop'),
      });
      editor.Commands.add('set-device-mobile', {
        run: (editor) => editor.setDevice('Mobile'),
      });
      setEditor(editor)
    };
  }, [])
  return (
    <div classNameName="App">
      <div id='navbar' className='sidenav d-flex flex-column overflow-scroll'>
        <nav className='navbar navbar-light'>
          <div className='container-fluid'>
            <span className='navbar-brand mb-0 h3 logo'>Code Dexterous</span>
          </div>
        </nav>
        <div className='my-2 d-flex flex-column'>
          {/* <button
            type='button'
            className='btn btn-outline-secondary btn-sm mb-2 mx-2'
            data-bs-toggle='modal'
            data-bs-target='#addPageModal'
          >
            <i className='fa fa-plus'></i>
            Add Page
          </button> */}
          {/* <ul className='list-group pages'>
            <li className='list-group-item d-flex justify-content-between align-items-center'>
              Home
              <div className='m-2'>
                <button className='btn btn-sm btn-outline-primary'>
                  <i className='fa fa-pencil'></i>
                </button>
                <button className='btn btn-sm btn-outline-danger'>
                  <i className='fa fa-trash'></i>
                </button>
              </div>
            </li>
            <li className='list-group-item d-flex justify-content-between align-items-center'>
              About
              <div className='m-2'>
                <button className='btn btn-sm btn-outline-primary'>
                  <i className='fa fa-pencil'></i>
                </button>
                <button className='btn btn-sm btn-outline-danger'>
                  <i className='fa fa-trash'></i>
                </button>
              </div>
            </li>
            <li className='list-group-item d-flex justify-content-between align-items-center'>
              Contact Us
              <div className='m-2'>
                <button className='btn btn-sm btn-outline-primary'>
                  <i className='fa fa-pencil'></i>
                </button>
                <button className='btn btn-sm btn-outline-danger'>
                  <i className='fa fa-trash'></i>
                </button>
              </div>
            </li>
          </ul> */}
        </div>
        <div className=''>
          <ul className='nav nav-tabs' id='myTab' role='tablist'>
            <li className='nav-item' role='presentation'>
              <button
                className='nav-link active'
                id='block-tab'
                data-bs-toggle='tab'
                data-bs-target='#block'
                type='button'
                role='tab'
                aria-controls='block'
                aria-selected='true'
              >
                <i className='fa fa-cubes'></i>
              </button>
            </li>
            <li className='nav-item' role='presentation'>
              <button
                className='nav-link'
                id='layer-tab'
                data-bs-toggle='tab'
                data-bs-target='#layer'
                type='button'
                role='tab'
                aria-controls='layer'
                aria-selected='false'
              >
                <i className='fa fa-tasks'></i>
              </button>
            </li>
            <li className='nav-item' role='presentation'>
              <button
                className='nav-link'
                id='style-tab'
                data-bs-toggle='tab'
                data-bs-target='#style'
                type='button'
                role='tab'
                aria-controls='style'
                aria-selected='false'
              >
                <i className='fa fa-paint-brush'></i>
              </button>
            </li>
            <li className='nav-item' role='presentation'>
              <button
                className='nav-link'
                id='trait-tab'
                data-bs-toggle='tab'
                data-bs-target='#trait'
                type='button'
                role='tab'
                aria-controls='trait'
                aria-selected='false'
              >
                <i className='fa fa-cog'></i>
              </button>
            </li>
          </ul>
          <div className='tab-content'>
            <div
              className='tab-pane fade show active'
              id='block'
              role='tabpanel'
              aria-labelledby='block-tab'
            >
              <div id='blocks'></div>
            </div>
            <div className='tab-pane fade' id='layer' role='tabpanel' aria-labelledby='layer-tab'>
              <div id='layers-container'></div>
            </div>
            <div className='tab-pane fade' id='style' role='tabpanel' aria-labelledby='style-tab'>
              <div id='styles-container'></div>
            </div>
            <div className='tab-pane fade' id='trait' role='tabpanel' aria-labelledby='trait-tab'>
              <div id='trait-container'></div>
            </div>
          </div>
        </div>
      </div>
      <div className='main-content'>
        <nav className='navbar navbar-light'>
          <div className='container-fluid'>
            <div className='panel__devices'></div>
            <div className='panel__basic-actions'></div>
          </div>
        </nav>
        <div id='editor'></div>
        {/* <div
          className='modal fade'
          id='addPageModal'
          tabindex='-1'
          aria-labelledby='addPageModalLabel'
          aria-hidden='true'
          data-bs-backdrop='static'
          data-bs-keyboard='false'
        >
          <div className='modal-dialog'>
            <div className='modal-content'>
              <form id='create-page' onsubmit='return validatForm(event)' novalidate>
                <div className='modal-header'>
                  <h5 className='modal-title' id='addPageModalLabel'>Create Page</h5>
                  <button
                    type='button'
                    className='btn-close'
                    data-bs-dismiss='modal'
                    aria-label='Close'
                  ></button>
                </div>
                <div className='modal-body'>
                  <div className='col-auto'>
                    <label htmlFor='name' className='form-label'>Name</label>
                    <input
                      type='text'
                      className='form-control form-control-sm'
                      id='name'
                      name='name'
                      placeholder='Name of Page'
                      required
                    />
                    <div className='invalid-feedback'>
                      Please provide a valid name.
                    </div>
                  </div>
                </div>
                <div className='modal-footer'>
                  <button
                    type='button'
                    className='btn btn-secondary btn-sm'
                    data-bs-dismiss='modal'
                    onclick='clearForm()'
                  >
                    Close
                  </button>
                  <button type='submit' className='btn btn-primary btn-sm'>
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Editor