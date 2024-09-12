#!/usr/bin/env node

import { Command } from 'commander';
import { ZKP } from '@bel2labs/sdk';
import { ethers } from 'ethers';
import * as dotenv from 'dotenv';
import * as readlineSync from 'readline-sync';

dotenv.config();

const program = new Command();

function askForSubscription(): boolean {
    const answer = readlineSync.question('Do you want to subscribe to verification status updates? (y/n): ');
    return answer.toLowerCase() === 'y';
}

program
    .version('1.0.0')
    .description('A CLI tool for interacting with BeL2 SDK');

program
    .command('verify-transaction <txId>')
    .description('Verify a transaction')
    .action(async (txId: string) => {
        try {
            const rpcUrl = process.env.RPC_URL;
            const chainId = process.env.CHAIN_ID;
            const privateKey = process.env.PRIVATE_KEY;

            if (!chainId || !rpcUrl || !privateKey) {
                throw new Error('Missing environment variables');
            }

            const provider = new ethers.JsonRpcProvider(rpcUrl);
            const signingKey = new ethers.SigningKey(privateKey);
            const signer = new ethers.Wallet(signingKey, provider);

            const verification = await ZKP.EthersV6.TransactionVerification.create(txId, parseInt(chainId));

            if (!verification.isSubmitted()) {
                const response = await verification.submitVerificationRequest((ethers.JsonRpcSigner) signer);
                console.log("Verification submitted:", response);
            } else {
                console.log("Verification already submitted");
            }

            if (askForSubscription()) {
                verification.status$.subscribe((status) => {
                    console.log("New status:", status);
                });
                console.log("Subscribed to status updates. Waiting for updates...");
                console.log("You can exit at any moment by pressing Ctrl+C");
                // Keep the process running until the user terminates it
                process.stdin.resume();
            } else {
                // If the user doesn't want to subscribe, check the status once
                const status = await verification.checkStatus();
                console.log("Current verification status:", status);
                process.exit(0);
            }

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Error:', error.message);
            } else {
                console.error('An unknown error occurred');
            }
            process.exit(1);
        }
    });

program.parse(process.argv);