/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";

// Images
import entry from "assets/images/entry.png";

export function Author({ image, name, email }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox mr={2}>
        <SoftAvatar src={image} alt={name} size="sm" variant="rounded" />
      </SoftBox>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {name}
        </SoftTypography>
        <SoftTypography variant="caption" color="secondary">
          {email}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

export function Function({ job, org }) {
  return (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {job}
      </SoftTypography>
      <SoftTypography variant="caption" color="secondary">
        {org}
      </SoftTypography>
    </SoftBox>
  );
}

const authorsTableData = {
  columns: [
    { name: "Request", align: "left" },
    { name: "Category", align: "left" },
    { name: "Access", align: "center" },
    { name: "Timestamp", align: "center" },
  ],

  rows: [
    {
      Request: <Author image={entry} name="Youtube" email="https://youtube.com/?q=physics" />,
      Category: <Function job="Education" />,
      Access: (
        <SoftBadge variant="gradient" badgeContent="Allowed" color="success" size="xs" container />
      ),
      Timestamp: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          23/04/18 11:23:30
        </SoftTypography>
      ),
    },
    {
      Request: <Author image={entry} name="Google" email="https://google.com/?q=physics" />,
      Category: <Function job="Education" />,
      Access: (
        <SoftBadge variant="gradient" badgeContent="Not Allowed" color="error" size="xs" container />
      ),
      Timestamp: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          23/04/18 11:23:30
        </SoftTypography>
      ),
    },
    {
      Request: <Author image={entry} name="Wikipedia" email="https://wikipedia.com/?q=physics" />,
      Category: <Function job="Education" />,
      Access: (
        <SoftBadge variant="gradient" badgeContent="Allowed" color="success" size="xs" container />
      ),
      Timestamp: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          23/04/18 11:23:30
        </SoftTypography>
      ),
    },
    {
      Request: <Author image={entry} name="GitHub" email="https://github.com/?q=physics" />,
      Category: <Function job="Education" />,
      Access: (
        <SoftBadge variant="gradient" badgeContent="Not Allowed" color="error" size="xs" container />
      ),
      Timestamp: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          23/04/18 11:23:30
        </SoftTypography>
      ),
    },
    {
      Request: <Author image={entry} name="Stack Overflow" email="https://stackoverflow.com/?q=physics" />,
      Category: <Function job="Education" />,
      Access: (
        <SoftBadge variant="gradient" badgeContent="Allowed" color="success" size="xs" container />
      ),
      Timestamp: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          23/04/18 11:23:30
        </SoftTypography>
      ),
    }


  ],
};

export default authorsTableData;
