import { useOrgStore } from "@/stores/organisation";
import { Navigate } from "react-router-dom";
import "@/styles/pages/organisations/settings.css";
import SettingCard from "@/components/organisation/settings/SettingCard";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { API } from "@/services/api";

export const organisationSchema = z.object({
  name: z
    .string()
    .min(3, "Organisation name must be at least 3 characters long")
    .max(50, "Organisation name too long"),
  description: z
    .string()
    .max(500, "Description must be under 200 characters")
    .optional()
    .or(z.literal("")),
  timezone: z.string().nonempty("Timezone is required"),
  isActive: z.boolean().default(true),
});

export type Inputs = z.infer<typeof organisationSchema>;

function OrganisationSettingPage() {
  const { organisation } = useOrgStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: organisation?.name,
      description: organisation?.description,
      timezone: organisation?.timezone,
      isActive: organisation?.isActive,
    },
  });

  const updateOrganisation = (data: Inputs) => {
    API.put(`/organisations/${organisation?.id}`, data);
  };

  if (!organisation) return <Navigate to="/organisations" replace />;

  return (
    <div className="org_setting_content">
      <h1>{organisation?.name} Settings</h1>

      <form
        style={{ margin: 0, padding: 0 }}
        onSubmit={handleSubmit(updateOrganisation)}
      >
        <section>
          <h2>General</h2>
          <p>Manage basic organisation information.</p>

          <SettingCard title="Name" description="Change the organisations name">
            <input type="text" {...register("name")} />
            {errors.name && (
              <span className="error">{errors.name.message}</span>
            )}
          </SettingCard>

          <SettingCard
            title="Description"
            description="Change the organisations description"
          >
            <input type="text" {...register("description")} />
            {errors.description && (
              <span className="error">{errors.description.message}</span>
            )}
          </SettingCard>

          <SettingCard
            title="Timezone"
            description="Set the organisation timezone"
          >
            <input type="text" {...register("timezone")} />
            {errors.timezone && (
              <span className="error">{errors.timezone.message}</span>
            )}
          </SettingCard>

          <SettingCard title="Active Status" description="Toggle active state">
            <label>
              <input type="checkbox" {...register("isActive")} />
              Active
            </label>
          </SettingCard>

          <button type="submit" className="btn-primary">
            Save Changes
          </button>
        </section>
      </form>

      <section>
        <h2>Members</h2>
        <p>Manage access and roles for your team.</p>
        {/* <MemberManagement /> */}
      </section>

      <section className="danger">
        <h2>Danger Zone</h2>
        <p>Delete organisation or transfer ownership.</p>
        <SettingCard
          title="Transfer Organisation"
          description="Transfer ownership of organisation to another member"
          variant="danger"
        >
          <select name="owner" id="org-owner">
            <option value="Ranzz"></option>
          </select>
          <button>Transfer</button>
        </SettingCard>
        <SettingCard
          title="Delete Organisations"
          description="This action cannot be undone"
          variant="danger"
        >
          <button>Delete</button>
        </SettingCard>
      </section>
    </div>
  );
}

export default OrganisationSettingPage;
