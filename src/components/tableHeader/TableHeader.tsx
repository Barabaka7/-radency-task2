import { TableType } from "../../utilities/fetchingData";

interface TableHeaderProps {
  type: TableType;
}

export const TableHeader = ({ type }: TableHeaderProps) => {
  switch (type) {
    case TableType.Active:
      return (
        <thead>
          <tr className="tableHeader">
            <th></th>
            <th>Name</th>
            <th>Created</th>
            <th>Category</th>
            <th>Content</th>
            <th>Dates</th>
            <th></th>
            <th>
              <button
                className="tableButton"
                type="button"
                name="archiveAll"
                id="archiveAll"
                title="Archive All Notes!"
              >
                <img
                  className="tableHeaderIcon"
                  src="/img/archive-white.png"
                  alt="Archive All"
                />
              </button>
            </th>
            <th>
              <button
                className="tableButton"
                type="button"
                name="deleteAll"
                id="deleteAll"
                title="Delete All Notes!"
              >
                <img
                  className="tableHeaderIcon"
                  src="img/delete-white.png"
                  alt="Delete All"
                />
              </button>
            </th>
          </tr>
        </thead>
      );

    case TableType.Archive:
      return (
        <thead>
          <tr className="tableHeader">
            <th></th>
            <th>Name</th>
            <th>Created</th>
            <th>Category</th>
            <th>Content</th>
            <th>Dates</th>
            <th>
              <button
                className="tableButton"
                type="button"
                name="unarchiveAll"
                id="unarchiveAll"
                title="Unarchive All Notes!"
              >
                <img
                  className="tableHeaderIcon"
                  src="img/unarchive-white.png"
                  alt="Unarchive All"
                />
              </button>
            </th>
            <th>
              <button
                className="tableButton"
                type="button"
                name="deleteAllArchive"
                id="deleteAllArchive"
                title="Delete All Notes from Archive!"
              >
                <img
                  className="tableHeaderIcon"
                  src="/img/delete-white.png"
                  alt="Delete All"
                />
              </button>
            </th>
          </tr>
        </thead>
      );

    case TableType.Summary:
      return (
        <thead>
          <tr className="tableHeader">
            <th></th>
            <th>Note Category</th>
            <th>Active</th>
            <th>Archived</th>
          </tr>
        </thead>
      );
  }
};
