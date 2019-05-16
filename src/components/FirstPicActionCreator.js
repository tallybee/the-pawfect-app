import React, { Component } from "react";
import request from "superagent";

export default function createBreed() {
  // state = { wrongOptionOne: null, wrongOptionTwo: null };
  function componentDidMount() {
    request
      .get(`https://dog.ceo/api/breeds/list/all`)
      .then(response => {
        const breeds = Object.keys(response.body.message);
        this.updateOptions(breeds);
      })
      .catch(console.error);

    return function updateOptions (breeds) {
      this.setState({
        wrongOptionOne: breeds[Math.floor(Math.random() * breeds.length)],
        wrongOptionTwo: breeds[Math.floor(Math.random() * breeds.length)]
      });
    };
  };
};
