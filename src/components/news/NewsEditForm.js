import React, { Component } from "react";
import NewsAPIManager from "../../modules/NewsManager";
import "../appStyles/applicationStyles.css"
export default class NewsEditForm extends Component {
  // Set initial state
  state = {
    title: "",
    synopsis: "",
    url: "",
    userId: sessionStorage.getItem("credentials")
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  updateExistingArticle = evt => {
    evt.preventDefault();

    if (this.state.title === "") {
      window.alert("Please enter a title");
    } else {
      const editedArticle = {
        id: this.props.match.params.newsId,
        title: this.state.title,
        synopsis: this.state.synopsis,
        url: this.state.url,
        userId: this.state.userId
        // newsId: parseInt(this.state.newsId)
      };

      this.props
        .updateArticle(editedArticle)
        .then(() => this.props.history.push("/news"));
    }
  };

  componentDidMount() {
    NewsAPIManager.getOneArticle(this.props.match.params.newsId).then(article => {
      this.setState({
        title: article.title,
        synopsis: article.synopsis,
        url: article.url
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <form className="newsForm">
          <div className="form-group">
            <label htmlFor="Title">Article Title</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="title"
              value={this.state.title}
            />
          </div>
          <div className="form-group">
            <label htmlFor="synopsis">Synopsis</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="synopsis"
              value={this.state.synopsis}
            />
          </div>
          <div className="form-group">
            <label htmlFor="url">URL</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="url"
              value={this.state.url}
            />
          </div>
          <button
            type="submit"
            onClick={this.updateExistingArticle}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}