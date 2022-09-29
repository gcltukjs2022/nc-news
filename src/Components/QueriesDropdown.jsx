import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";

export default function QueriesDropdown({
  queries,
  setQueries,
  setSearchParams,
}) {
  const [currentSortAndOrder, setCurrentSortAndOrder] = useState(``);

  useEffect(() => {
    setCurrentSortAndOrder(
      `Sorted by ${
        queries.query === "votes"
          ? "Votes"
          : queries.query === "comment_count"
          ? "Comments"
          : "Date"
      }
      ${queries.order === "asc" ? "Ascending" : "Descending"}`
    );
  }, [queries]);

  useEffect(() => {
    if (Object.keys(queries).length !== 0) {
      for (const key of Object.keys(queries)) {
        if (queries[key] === "") {
          delete queries[key];
        }
      }
      delete queries.topic;
      setSearchParams({ ...queries });
    }
  }, [queries]);

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic">Sort by</Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => {
              setQueries((currQueries) => {
                return { ...currQueries, query: "created_at" };
              });
              setSearchParams({ sort_by: "Date" });
            }}
          >
            Date(Default)
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setQueries((currQueries) => {
                return { ...currQueries, query: "comment_count" };
              });
              setSearchParams({ sort_by: "Comments" });
            }}
          >
            Comments
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setQueries((currQueries) => {
                return { ...currQueries, query: "votes" };
              });
              setSearchParams({ sort_by: "Votes" });
            }}
          >
            Votes
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item
            onClick={() => {
              setQueries((currQueries) => {
                return { ...currQueries, order: "DESC" };
              });
            }}
          >
            Descending(Default)
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setQueries((currQueries) => {
                return { ...currQueries, order: "asc" };
              });
            }}
          >
            Ascending
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <p>{currentSortAndOrder}</p>
    </div>
  );
}
