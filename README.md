# TTP-FS-20180728 Fullstack Assessment

## Overview
For this assessment, you’ll need to implement a web based stock portfolio app. For
the purpose of this exercise a stock is simply an asset that can be bought or sold
(like a house) at a price that continuously rises and falls throughout the day. Up to
date pricing information is available for free via the [IEX API](https://iextrading.com/developer/docs/#getting-started). A guide to the UI can be
observed below. Your implementation doesn’t need to be an exact match but should
implement all of the listed user stories. In addition to the user stories, your
submission will be assessed for readability, code organization, commit history
clarity, overall UI/UX, and overall API design.

All code submitted should be placed in a GitHub repository named `TTP-FS-
20180728`.

## Design & Style Guide

## User Stories (6)
1. As a user I want to create a new account with my `name`, `email`, and `password` so
that I can buy and trade stocks.
  - Default the user’s cash account balance to $5000.00 USD.
  - A user can only register once with any given email.

2. As a user I want to authenticate via `email` and `password` so that I can access my
account.

3. As a user I want to buy shares of stock at its current price by specifying its
`ticker symbol` and `number of shares` so that I can invest.
 - A user can only buy whole number quantities of shares.
 - A user can only buy shares if they have enough cash in their account for a
given purchase.
 - A user can only buy shares if the ticker symbol is valid.