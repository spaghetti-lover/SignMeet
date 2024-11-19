"use client";
import React, { useEffect, useState } from "react";

const EyeTrackingComponent = () => {
  useEffect(() => {
    async function turnOnCamera() {
      await webgazer
        .setRegression("ridge")
        .setGazeListener((data, elapsedTime) => {
          if (data && data.x && data.y) {
            console.log(data.x, data.y);
          } else {
            console.log("See nothing");
          }
        })
        .begin();
    }
    turnOnCamera();
    return () => {
      webgazer.end();
    };
  }, []);

  return <div>Demo</div>;
};

export default EyeTrackingComponent;
