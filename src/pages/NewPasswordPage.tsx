export function NewPasswordPage() {
  return (
    <>
      <div className="w-screen flex flex-wrap items-center justify-center">
        <div className="flex flex-col">
          <h1 className="text-center text-white text-5xl mt-20 mb-20">
            Criar Nova Senha
          </h1>
          <div className="flex flex-col items-center justify-center text-center bg-white rounded-2xl items-center p-10 shadow-lg w-full max-lg:rounded-2xl">
            <h2 className="flex items-center justify-center mt-16 mb-12 text-3xl font-semibold font-['Open Sans']">
              Preencha os dados abaixo para recuperar sua senha
            </h2>
            <div className="flex justify-center items-center max-w-md">
              <form className="container flex flex-col gap-4 p-4">
                <div className="mb-1">
                  <label className="mb-2 block" htmlFor="password">
                    Código de verificação
                  </label>
                  <input
                    className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    id="verification-code"
                    name="verification-code"
                  />
                </div>
                <div className="mb-1">
                  <label className="mb-2 block" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="******************"
                    type="password"
                    id="password"
                    name="password"
                  />
                </div>
                <div className="mb-1">
                  <label className="mb-2 block" htmlFor="confirm-password">
                    Confirmar nova senha
                  </label>
                  <input
                    className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="******************"
                    type="password"
                    id="confirm-password"
                    name="confirm-password"
                  />
                </div>
                <button
                  className="w-full bg-jays-orange text-white py-2 px-4 rounded hover:bg-jays-hover transition-bg duration-300"
                  type="submit"
                >
                  Salvar nova senha
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
