import _ from "lodash";

const postPatch = async function(id, requisition) {
  try {
    const response = await fetch(`/reqs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requisition),
    });
    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    throw new Error("Could not update requisition.");
  }
};

const debouncedPostPatch = _.debounce(postPatch, 500, { trailing: true });

export { postPatch, debouncedPostPatch };
