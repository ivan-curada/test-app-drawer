import { html, css, LitElement, property } from 'lit-element';

export class TestWebComponent extends LitElement {
  static styles =css`
    :host {
      font-family: 'Arial', sans-serif;
    }

    a{
      text-decoration: none;
    }

    .drawer-btn{
      display: flex;
      background: white;
      border: 1px solid lightgrey;
      padding: 8px;
      cursor: pointer;
      outline: none;
      justify-self: flex-end;
    }
    .toggle-icon{
      max-width: 25px;
      max-height: 25px;
    }

    .apps-container{
      min-width: 605px;
      max-width: 30vw;
      height: auto;
      display: flex;
      flex-wrap: wrap;
      margin: 16px 4px 4px 4px;
      padding: 8px;
      background: #FFFFFF 0% 0% no-repeat padding-box;
      box-shadow: 0px 3px 32px #00000014;
      position: absolute;
      z-index: 99999999;
    }
    
    .apps-container-hidden{
      display: none;
    }
    
    .overflow {
      right: 1%;
    }

    .app-drawer{
      display: block;
      overflow: hidden;
    }

    .app{
      display: flex;
      flex-direction: column;
      padding: 8px;
      margin: 8px;
      justify-content: center;
      align-items: center;
      text-align: center;
    }

    .app-title{
      font-weight: bold;
      
    }
  `;
  
  @property({type: Array}) apps: any[] = [];
  @property({type: Boolean}) show_apps = false;
  @property({type: Boolean}) is_loading = true;
  @property({type: Boolean}) is_overflow = true;

  constructor(){
    super();
    
    this.apps = [
      {
        title: "Gmail",
        href: 'https://mail.google.com',
        img_link: 'https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x.png'
      },
      {
        title: "Gmail",
        href: 'https://mail.google.com',
        img_link: 'https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x.png'
      },
      {
        title: "Gmail",
        href: 'https://mail.google.com',
        img_link: 'https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x.png'
      },
      {
        title: "Gmail",
        href: 'https://mail.google.com',
        img_link: 'https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x.png'
      },
      {
        title: "Gmail",
        href: 'https://mail.google.com',
        img_link: 'https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x.png'
      },
      {
        title: "Gmail",
        href: 'https://mail.google.com',
        img_link: 'https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x.png'
      }
    ];

    this.addEventListener('toggleApps', async (e: any) => {
      this.show_apps = e.detail;
      await this.requestUpdate();
      this.alignElement();
    });
  }

  
  toggleApps = () => {
    let event = new CustomEvent('toggleApps', {
      detail: !this.show_apps
    });
    this.dispatchEvent(event)
  }

  getDrawerBtnElement = () => {
    return this.shadowRoot?.getElementById('drawer-btn');
  }

  getAppsContainerElement = (): HTMLElement | any => {
    let element = this.shadowRoot?.getElementById('apps-container');
    if(!element){
      return null;
    }
    // var element = this.shadowRoot?.querySelector('#apps-container');
    // setTimeout(()=> console.log(element.) , 2000)
    // var bounding = element?.getBoundingClientRect();
    return element;
  }

  alignElement = () => {
    if(this.show_apps){
      let window = document.documentElement.clientWidth;
      let position = this.getPosition();
      let drawer_button_offset = this.getDrawerBtnElement()?.offsetLeft || 0;
      if(position.x > (window / 2)){
        // Align the drawer to right
        this.getAppsContainerElement().style.right = `0`
      }
      else {
        // Align the drawer by the position of the drawer button;
        this.getAppsContainerElement().style.left = `${drawer_button_offset / window}`
      }
    }
  };

 
  getPosition = () => {
    let element = this.getAppsContainerElement();
    let x = 0;
    let y = 0;
    while(element){
      x += (element.offsetLeft - element.scrollLeft + element.clientLeft);
      y += (element.offsetTop - element.scrollTop + element.clientTop);
      element = element.offsetParent;
    }
   
    return {
      x: x,
      y: y
    }
  }


  render() {
    return html`
      <div class='app-drawer'>
        <button id='drawer-btn' @click=${this.toggleApps} class='drawer-btn'>
          <img class='toggle-icon' src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjI3Ni4xNjdweCIgaGVpZ2h0PSIyNzYuMTY3cHgiIHZpZXdCb3g9IjAgMCAyNzYuMTY3IDI3Ni4xNjciIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDI3Ni4xNjcgMjc2LjE2NzsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGQ9Ik0zMy4xNDQsMi40NzFDMTUuMzM2LDIuNDcxLDAuODUsMTYuOTU4LDAuODUsMzQuNzY1czE0LjQ4LDMyLjI5MywzMi4yOTQsMzIuMjkzczMyLjI5NC0xNC40ODYsMzIuMjk0LTMyLjI5Mw0KCQkJUzUwLjk1MSwyLjQ3MSwzMy4xNDQsMi40NzF6Ii8+DQoJCTxwYXRoIGQ9Ik0xMzcuNjYzLDIuNDcxYy0xNy44MDcsMC0zMi4yOTQsMTQuNDg3LTMyLjI5NCwzMi4yOTRzMTQuNDg3LDMyLjI5MywzMi4yOTQsMzIuMjkzYzE3LjgwOCwwLDMyLjI5Ny0xNC40ODYsMzIuMjk3LTMyLjI5Mw0KCQkJUzE1NS40NzcsMi40NzEsMTM3LjY2MywyLjQ3MXoiLz4NCgkJPHBhdGggZD0iTTI0My44NzMsNjcuMDU5YzE3LjgwNCwwLDMyLjI5NC0xNC40ODYsMzIuMjk0LTMyLjI5M1MyNjEuNjg5LDIuNDcxLDI0My44NzMsMi40NzFzLTMyLjI5NCwxNC40ODctMzIuMjk0LDMyLjI5NA0KCQkJUzIyNi4wNjgsNjcuMDU5LDI0My44NzMsNjcuMDU5eiIvPg0KCQk8cGF0aCBkPSJNMzIuMywxNzAuNTM5YzE3LjgwNywwLDMyLjI5Ny0xNC40ODMsMzIuMjk3LTMyLjI5M2MwLTE3LjgxMS0xNC40OS0zMi4yOTctMzIuMjk3LTMyLjI5N1MwLDEyMC40MzYsMCwxMzguMjQ2DQoJCQlDMCwxNTYuMDU2LDE0LjQ5MywxNzAuNTM5LDMyLjMsMTcwLjUzOXoiLz4NCgkJPHBhdGggZD0iTTEzNi44MTksMTcwLjUzOWMxNy44MDQsMCwzMi4yOTQtMTQuNDgzLDMyLjI5NC0zMi4yOTNjMC0xNy44MTEtMTQuNDc4LTMyLjI5Ny0zMi4yOTQtMzIuMjk3DQoJCQljLTE3LjgxMywwLTMyLjI5NCwxNC40ODYtMzIuMjk0LDMyLjI5N0MxMDQuNTI1LDE1Ni4wNTYsMTE5LjAxMiwxNzAuNTM5LDEzNi44MTksMTcwLjUzOXoiLz4NCgkJPHBhdGggZD0iTTI0My4wMzgsMTcwLjUzOWMxNy44MTEsMCwzMi4yOTQtMTQuNDgzLDMyLjI5NC0zMi4yOTNjMC0xNy44MTEtMTQuNDgzLTMyLjI5Ny0zMi4yOTQtMzIuMjk3DQoJCQlzLTMyLjMwNiwxNC40ODYtMzIuMzA2LDMyLjI5N0MyMTAuNzMyLDE1Ni4wNTYsMjI1LjIyMiwxNzAuNTM5LDI0My4wMzgsMTcwLjUzOXoiLz4NCgkJPHBhdGggZD0iTTMzLjAzOSwyMDkuMTA4Yy0xNy44MDcsMC0zMi4zLDE0LjQ4My0zMi4zLDMyLjI5NGMwLDE3LjgwNCwxNC40OTMsMzIuMjkzLDMyLjMsMzIuMjkzczMyLjI5My0xNC40ODIsMzIuMjkzLTMyLjI5Mw0KCQkJUzUwLjg0NiwyMDkuMTA4LDMzLjAzOSwyMDkuMTA4eiIvPg0KCQk8cGF0aCBkPSJNMTM3LjU2NCwyMDkuMTA4Yy0xNy44MDgsMC0zMi4zLDE0LjQ4My0zMi4zLDMyLjI5NGMwLDE3LjgwNCwxNC40ODcsMzIuMjkzLDMyLjMsMzIuMjkzDQoJCQljMTcuODA0LDAsMzIuMjkzLTE0LjQ4MiwzMi4yOTMtMzIuMjkzUzE1NS4zNjgsMjA5LjEwOCwxMzcuNTY0LDIwOS4xMDh6Ii8+DQoJCTxwYXRoIGQ9Ik0yNDMuNzcxLDIwOS4xMDhjLTE3LjgwNCwwLTMyLjI5NCwxNC40ODMtMzIuMjk0LDMyLjI5NGMwLDE3LjgwNCwxNC40OSwzMi4yOTMsMzIuMjk0LDMyLjI5Mw0KCQkJYzE3LjgxMSwwLDMyLjI5NC0xNC40ODIsMzIuMjk0LTMyLjI5M1MyNjEuNTc1LDIwOS4xMDgsMjQzLjc3MSwyMDkuMTA4eiIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K" />
        </button>
        <div id='apps-container'
          class=${this.show_apps ? 'apps-container' : 'apps-container-hidden'}>
          ${this.apps.map(i => html`
            <div class='app'>
              <a href=${i.href} target="_blank">
                <img src=${i.img_link} alt=${i.title}/>
                <p class='app-title'>${i.title}</p>
              </a>
            </div>
          `)}
        </div>
      </div>
    `;
  }
}
