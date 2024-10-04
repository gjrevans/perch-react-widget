import React, { useEffect, useRef } from "react";

interface HomeWidgetProps {
  title?: string;
  content?: React.ReactNode;
}

const HomeWidget: React.FC<HomeWidgetProps> = ({ title, content }) => {
  const widgetRef = useRef<HTMLDivElement | null>(null);
  
  // Set the widget ID for the Perch widget
  const widgetId = "wdFwegLY";
  const scriptSrc = "https://embeds.myperch.io/assets/perch-embed-widget.js";

  useEffect(() => {
    // Check if the script has already been added to the document
    if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
      // Dynamically load the Perch script after the component mounts
      const script = document.createElement("script");
      script.src = scriptSrc;
      script.async = true;

      script.onload = () => {
        console.log("Perch script loaded successfully for HomeWidget.");

        // Create a custom event that signals the Perch widget to initialize
        const event = new CustomEvent("perch-widget:init", {
          detail: {
            perchWidgetId: widgetId,
          },
        });

        // Dispatch the event on the window object
        window.dispatchEvent(event);
      };

      script.onerror = () => console.error("Error loading Perch script for HomeWidget.");

      document.body.appendChild(script);
      console.log("Perch script appended to the document for HomeWidget.");
    } else {
      // If the script already exists, only initialize the widget without adding the script again
      console.log("Perch script already exists. Initializing HomeWidget directly.");

      // Dispatch the custom event to initialize the widget
      const event = new CustomEvent("perch-widget:init", {
        detail: {
          perchWidgetId: widgetId,
        },
      });

      window.dispatchEvent(event);
    }
  }, [scriptSrc, widgetId]);

  return (
    <div>
      <div ref={widgetRef} className="perch-widget" widget-id={widgetId}>
        {/* Replace the inner content with custom loader */}
        <div className="perch-widget-loading-indicator" style={{ textAlign: "center" }}>
          Loading...
        </div>
      </div>
    </div>
  );
};

export default HomeWidget;
