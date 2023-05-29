import React, { useEffect } from "react";
import LabelStudio from "label-studio";
//import "label-studio/build/static/css/main.css";
import useImageRequests from "./use-image-requests";

const BASE_URL = "http://185.100.235.210/id_verify";

function LabelStudioUI({ uid, labelConfig }) {
  const [sendImageRequest, imageUrl, imageLoading, imageError] =
    useImageRequests();
  const imageLocation = `id_${uid}.jpg`;

  useEffect(() => {
    if (imageLocation) {
      sendImageRequest({
        url: `/id_image/${imageLocation}`,
        method: "GET",
        header: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      });
    }
  }, [imageLocation]);

  useEffect(() => {
    new LabelStudio("label-studio", {
      config: labelConfig,

      interfaces: [
        "panel",
        "update",
        "submit",
        "controls",
        "side-column",
        "annotations:menu",
        // "annotations:add-new",
        // "annotations:delete"
        // "auto-annotation",
      ],

      user: {
        pk: 1,
        firstName: "James",
        lastName: "Dean",
      },

      task: {
        annotations: [],
        predictions: [],
        id: 1,
        data: {
          image: imageUrl,
        },
      },

      onLabelStudioLoad: function (LS) {
     
        var c = LS.annotationStore.addAnnotation({
          userGenerate: true,
        });
        LS.annotationStore.selectAnnotation(c.id);
      },
      onSubmitAnnotation: async function (LS, annotation) {
        // retrive an annotation
        console.log(annotation.serializeAnnotation());
        let annotationData = {};
        annotationData["Annotation"] = annotation.serializeAnnotation();
        annotationData["filename"] = imageLocation;
        try {
          const response = await fetch(BASE_URL + "/add_labels", {
            method: "POST",
            body: JSON.stringify(annotationData),
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": true,
            },
          });
          if (!response.ok) throw new Error("Request Failed");
          const data = await response.json();
          if (data["status"] === "SUCCESS") {
          }
        } catch (err) {
          console.log(err);
        }
      },
      onUpdateAnnotation: async function (LS, annotation) {
        console.log(annotation.serializeAnnotation());
        let annotationData = {};
        annotationData["Annotation"] = annotation.serializeAnnotation();
        annotationData["filename"] = imageLocation;
        try {
          const response = await fetch(BASE_URL + "/add_labels", {
            method: "POST",
            body: JSON.stringify(annotationData),
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": true,
            },
          });
          if (!response.ok) throw new Error("Request Failed");
          const data = await response.json();
          if (data["status"] === "SUCCESS") {
          }
        } catch (err) {
          console.log(err);
        }
      },
    });
  }, [imageUrl, labelConfig]);

  return (
    <div
      id="label-studio"
      style={{
        backgroundColor: "white",
        padding: 10,
        height: "100vh",
        overflowY: "scroll",
      }}
    ></div>
  );
}

export default LabelStudioUI;
