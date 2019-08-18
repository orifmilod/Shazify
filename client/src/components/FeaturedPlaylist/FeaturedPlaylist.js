import React, { Component } from "react";
import Gallery from "react-photo-gallery";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import { SadTear } from "styled-icons/fa-regular";
class FeaturedPlaylist extends Component {
  state = {
    featuredPlaylist: []
  };
  getFeaturedPlaylists = async access_token => {
    try {
      const limit = 50;
      const country = "PL"; //TODO: get this from User
      const response = await fetch(
        `https://api.spotify.com/v1/browse/featured-playlists?country=${country}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      );
      const featuredPlaylist = await response.json();
      this.setState({ featuredPlaylist: featuredPlaylist.playlists.items });
    } catch (err) {
      toast.error("Some error occured when fetching Featured Playlists.");
      console.error(err);
    }
  };

  componentDidMount() {
    const access_token = localStorage.getItem("accessToken");
    this.getFeaturedPlaylists(access_token);
  }
  render() {
    const { history } = this.props;
    const { featuredPlaylist } = this.state;
    const photos = featuredPlaylist.map(playlist => {
      return {
        id: playlist.id,
        src: playlist.images[0].url,
        width: 1,
        height: 1
      };
    });
    return (
      <React.Fragment>
        {featuredPlaylist.length > 0 ? (
          <Gallery
            photos={photos}
            onClick={e => history.push(`/home/playlist/${e.target.id}`)}
          />
        ) : (
          <div>
            Sorry could find the featured playlist. <SadTear size="24" />
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(FeaturedPlaylist);
