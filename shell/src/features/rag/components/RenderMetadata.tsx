import React from "react";

/**
 * Renders metadata recursively with indentation and array support.
 * @param metadata The metadata object to render.
 * @param level Indentation level (for internal recursion, default 0).
 */
export interface RenderMetadataProps {
  metadata: Record<string, any>;
  level?: number;
}

export const RenderMetadata: React.FC<RenderMetadataProps> = ({ metadata, level = 0 }) => {
  return (
    <>
      {Object.entries(metadata).map(([key, value], index) => {
        const isObject = value !== null && typeof value === "object" && !Array.isArray(value);
        const isArray = Array.isArray(value);
        return (
          <div
            key={`${key}-${index}`}
            className="mb-2"
            style={{ paddingLeft: `${level * 12}px` }}
          >
            <span className="font-semibold">{key}:</span>{" "}
            {isArray ? (
              <span className="text-gray-500">{value.join(", ")}</span>
            ) : isObject ? (
              <div className="ml-4 mt-1 pl-2 border-l-2 border-gray-300">
                <RenderMetadata metadata={value} level={level + 1} />
              </div>
            ) : (
              <span className="text-gray-500">{String(value)}</span>
            )}
          </div>
        );
      })}
    </>
  );
};
