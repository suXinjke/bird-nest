<script lang="ts">
  let numbers: number[] = []

  function onClick() {
    numbers.push(Math.random())
    numbers = numbers
  }
</script>

<div>
  <h1>Svelte</h1>

  <button on:click={onClick}>Add random number</button>

  {#each numbers as number}
    <div>
      {number}
    </div>
  {/each}
</div>
