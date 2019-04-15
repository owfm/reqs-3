import _ from "lodash";

const postPatch = async function(id, requisition) {
  try {
    const response = await fetch(`/reqs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requisition)
    });
    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    throw new Error("Could not update requisition.");
  }
};

const debouncedPostPatch = _.debounce(postPatch, 500, { trailing: true });

const deleteReq = async id => {
  const response = await fetch(`/reqs/${id}`, { method: "DELETE" });
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(response.statusText);
  }
};

export { postPatch, debouncedPostPatch, deleteReq };
