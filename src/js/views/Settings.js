import React from "react";
import BaseLayout, {withBaseLayout} from "../layouts/Base";
import {updateSettings} from "../actions/settingsActions";
import {useDispatch, useSelector} from "react-redux";

function Settings() {
  const dispatch = useDispatch()
  const {
    isDarkTheme,
    showNotifications, playSound
  } = useSelector(({settings}) => settings)

  const handleSettingsUpdate = ({target: {name, checked}}) => {
    dispatch(updateSettings(name, checked))
  }
  return (
    (
      // <BaseLayout canGoBack>
      <div className="centered-view">
        <div className="centered-container">
          <form className="centered-container-form">
            <div className="header">Adjust application settings</div>
            <button type="button">Notify Me</button>
            <div className="form-container">
              <div className="my-3">
                <div className="form-check">
                  <input
                    onChange={handleSettingsUpdate}
                    name="isDarkTheme"
                    checked={isDarkTheme}
                    type="checkbox"
                    className="form-check-input"/>
                  <label className="form-check-label">Dark Theme</label>
                </div>
                <div className="form-check">
                  <input
                    onChange={handleSettingsUpdate}
                    name="showNotifications"
                    checked={showNotifications}
                    type="checkbox"
                    className="form-check-input"/>
                  <label className="form-check-label">Enable Notification</label>
                </div>
                <div className="form-check">
                  <input
                    onChange={handleSettingsUpdate}
                    name="playSound"
                    checked={playSound}
                    type="checkbox"
                    className="form-check-input"/>
                  <label className="form-check-label">Play Sounds</label>
                </div>
              </div>
              <button
                type="button"
                onClick={() => window.electron.controlApi.quitApp()}
                className="btn btn-danger">
                Quit App
              </button>
            </div>
          </form>
        </div>
      </div>
      // </BaseLayout>
    )
  )
}

export default withBaseLayout(Settings, {canGoBack: true})