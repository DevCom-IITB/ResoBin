// import { DarkmodeToggle } from 'components/settings'
import styled from 'styled-components'

import DarkmodeToggle from 'components/settings/DarkmodeToggle'
import { device } from 'styles/responsive'

const Container = styled.div`
  min-height: calc(100vh - ${({ theme }) => theme.headerHeight});

  @media ${device.min.md} {
    margin-left: ${({ theme }) => theme.asideWidthLeft};
  }
`

const Settings = () => {
  return (
    <Container>
      <h1>Switch theme</h1>
      <DarkmodeToggle />
      <h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
        exercitationem excepturi assumenda quo iste ipsum voluptatibus
        blanditiis deleniti ullam ipsam porro dolorem neque ut, illum facilis
        suscipit amet nobis voluptatum quibusdam vitae voluptas inventore totam
        perspiciatis officiis! Perspiciatis est corrupti totam excepturi non
        accusamus voluptatem dolorem! Animi sint aliquam accusamus id
        perferendis ducimus voluptatem tempore soluta, suscipit facilis, quaerat
        asperiores enim laborum, officiis delectus veritatis numquam dicta nisi?
        Impedit, illo vero. Voluptatem voluptate placeat mollitia a accusantium
        nam eveniet inventore totam quibusdam modi dicta, et iste odit unde
        magni distinctio sit. Eligendi vero excepturi cupiditate voluptas odit
        impedit ullam debitis similique non dolores, placeat quasi dolore
        ratione quis quam veniam tenetur recusandae quae consequatur soluta
        magni explicabo sint illo. Mollitia, incidunt. Autem quaerat architecto
        fugit aut illo officiis vel dicta, modi quae iusto suscipit quod!
        Impedit suscipit tempora error ratione dignissimos nihil porro omnis
        incidunt est laboriosam doloremque esse recusandae iure laborum mollitia
        possimus veritatis tempore dolorem eligendi voluptas, dolores ipsa. In
        itaque vel dicta culpa quam, similique, facere possimus animi assumenda
        commodi vitae repellat quibusdam nesciunt at, laudantium illo
        perspiciatis dolorum quis ab quisquam deleniti cupiditate eum odio ad.
        Corrupti aut rerum architecto delectus suscipit. Deleniti officiis,
        explicabo quo ad nam aliquid sequi illum iure fugit corrupti consectetur
        eos quod a delectus non totam sunt. Explicabo corporis voluptas
        corrupti. Ipsam totam dolorum in magnam quo labore suscipit architecto,
        numquam ipsum veniam sit quasi. Vero quas non quae sequi ducimus neque
        tempore explicabo commodi atque, ad eos esse rerum repellat, quibusdam
        saepe maxime laudantium ullam, facilis dolores excepturi nostrum
        aliquam? Ratione assumenda illo amet iure aspernatur, magnam dolore ab
        quis labore excepturi cupiditate nam molestias aperiam vel temporibus
        ipsam dolorum dolor rerum, explicabo aliquam beatae. Consequuntur
        doloribus ex, in obcaecati dignissimos ut laboriosam maxime aperiam
        magnam ipsam nihil excepturi quis tempora asperiores magni fugiat
        sapiente culpa a facere illum, ipsum tempore. Rerum labore asperiores
        ducimus non ipsum atque ab, fuga nihil eum fugit inventore vero aliquid
        repudiandae repellat velit explicabo saepe qui similique aut aperiam
        reprehenderit facere cupiditate! Earum beatae tempore mollitia optio sed
        impedit? Iste maxime sequi optio cumque doloremque minima quibusdam
        obcaecati perferendis voluptates id magni tempora temporibus assumenda
        autem pariatur quisquam totam excepturi, repellat praesentium suscipit,
        corporis et repellendus! Quam excepturi vero voluptatem ea velit ipsam
        ratione itaque consequuntur! Alias corrupti hic atque quo quas,
        reiciendis qui laborum earum, placeat, ex voluptates maiores possimus
        quod aliquam voluptatum tempora! Consectetur iusto deleniti ipsam
        accusamus animi facere adipisci sequi magni corrupti impedit vero
        aliquam iure blanditiis quam natus quidem repellat eligendi eveniet
        voluptatum quos, odio libero ratione? Aspernatur corrupti, tempore
        eveniet voluptates asperiores modi expedita architecto quod optio
        numquam aperiam sapiente nemo omnis soluta a amet sunt ad quia error aut
        tenetur. Consequuntur quos perferendis nesciunt est odio fugiat autem
        aliquam iste iusto voluptatum, itaque quam sint dolorum possimus atque
        reiciendis et cumque consequatur? Nihil consectetur placeat vero! Hic
        iste nesciunt libero rerum dolor minus magni tempore dolore accusantium
        tenetur iusto repudiandae, fugiat, repellendus debitis enim, reiciendis
        voluptas adipisci?
      </h1>
    </Container>
  )
}

export default Settings
