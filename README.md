# BeL2 CLI Tool

A command-line interface tool for interacting with the BeL2 SDK.

## Description

This CLI tool provides a simple interface to interact with the BeL2 SDK, allowing users to verify transactions on the BeL2 network.

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/your-username/bel2-cli.git
   cd bel2-cli
   ```

2. Install dependencies:
   ```
   yarn install
   ```

3. Build the project:
   ```
   yarn build
   ```

4. (Optional) Link the CLI tool globally:
   ```
   yarn link
   ```

## Usage

After installation, you can use the CLI tool as follows:

```
yarn cli verify-transaction <txId> [options]
```

Or, if you've linked it globally:

```
bel2-cli verify-transaction <txId> [options]
```

### Commands

- `verify-transaction <txId>`: Verify a transaction on the BeL2 network.

### Examples

Verify a transaction:
```
yarn cli verify-transaction 0x1234567890abcdef
```

## Development

To run the tool in development mode:

## Configuration

1. Copy the `.env.example` file to a new file named `.env`:
   ```
   cp .env.example .env
   ```

2. Edit the `.env` file and replace the placeholder values with your actual configuration:
   ```
   RPC_URL=https://your-actual-rpc-url-here
   CHAIN_ID=20  # Replace with the appropriate chain ID
   PRIVATE_KEY=your-actual-account-private-key
   ```

   Replace `https://your-actual-rpc-url-here` with your actual Ethereum RPC URL, set the appropriate `CHAIN_ID` for your network and provide `PRIVATE_KEY` from your account.

   ## Debugging with VSCode

To debug the application using Visual Studio Code:

1. Ensure you have the `.vscode/launch.json` file in your project with the provided debug configuration.

2. Open the project in VSCode.

3. Set breakpoints in your code where you want to pause execution.

4. Go to the "Run and Debug" view in VSCode (Ctrl+Shift+D or Cmd+Shift+D on Mac).

5. From the dropdown at the top of the Debug view, select "Debug verify-transaction".

6. Click the green play button or press F5 to start debugging.

7. When prompted, enter the transaction ID you want to verify.

8. The debugger will pause at your set breakpoints, allowing you to inspect variables, step through code, and use other debugging features.

9. You can interact with the CLI prompts in the Debug Console or the integrated terminal, depending on your VSCode settings.

This setup allows you to debug the application interactively from VSCode while still maintaining the ability to run it from the command line normally.

Note: Make sure you have the required dependencies installed, including `ts-node` for TypeScript execution.

Remember that the debug configuration uses the integrated terminal, so you'll be able to respond to CLI prompts (like asking for subscription to verification status updates) directly in VSCode's terminal window during debugging.
