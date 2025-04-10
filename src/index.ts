import CreatePost from "./components/create_post"
if (!customElements.get('create-post')) {
    customElements.define('create-post', CreatePost);
  }