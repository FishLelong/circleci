<!--
Provide a general summary of the issue in the title above and use relevant 
fields below to define the problem.
-->

#### User Story
<!--
- Audience or user can include a person or system, i.e. dev, user, api.
- An action or task this issue will accomplish.
- What is the desired outcome or goal?

NOTE: Feel free to replace this with a general description if a user story doesn't make sense, but
be willing to defend your choice to exclude a user story.
-->
- As an <audience/user>: liquidity provider
- I want to <action/task>: be able to click through to the etherscan page for the current pool contract
- so that <outcome/goal/benefit>: I can dig deeper or call contract functions directly

#### Type
<!--
- Select a type of issue
-->
- [X] Enhancement
- [ ] Maintenance
- [ ] Refactor

#### Description
<!--
- Describe the problem and why this task is needed.
-->

Directly below the farming returns box (left column) will be two grey boxes which sit next to each other. The box on the left will contain two lines. The first line will be the words `Check the contract on` in extra small text. The second line will be the Etherscan logo. Clicking anywhere on this box should open a new tab on the etherscan address page for the pool's token / proxy contract located at https://etherscan.io/address/[ADDRESS]. 

#### Definition of Done
<!--
- How do you know when this issue is completed?
- List acceptance criteria, bullet points are always preferred.
-->

- [ ] `Check the contract on\n[etherscan logo]`
- [ ] Click anywhere to open a new tab at https://etherscan.io/address/[ADDRESS]

#### Attach files or screenshots if it's helpful for this issue.

![simple page](https://piedao-productpage-improvements.netlify.app/img/page08.png)