import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
type FormFields = z.infer<typeof schema>;
const App = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      email: "test@email.com",
    },
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      throw new Error();
    } catch (error) {
      setError("root", {
        message: "Something went wrong. Please try again!",
      });
    }
  };
  return (
    <form
      className="tutorial gap-2"
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
    >
      <input {...register("email")} type="text" placeholder="Email" />
      {errors.email && (
        <div className="text-red-500">{errors.email.message}</div>
      )}
      <input {...register("password")} type="password" placeholder="Password" />
      {errors.password && (
        <div className="text-red-500">{errors.password.message}</div>
      )}
      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Loading..." : "Next"}
      </button>
      {errors.root && <div className="text-red-500">{errors.root.message}</div>}
    </form>
  );
};
export default App;
